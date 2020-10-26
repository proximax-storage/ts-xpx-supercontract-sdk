import {JSONEncoder} from "assemblyscript-json";

export enum Status {
    Success,
    ErrorMemoryAllocation,
    ErrorMemoryReallocation,
    ErrorExternalFunctionExecution,
    ErrorInitFired = -37,
    ErrorConstructorFired = -38
}

export class Result<T> {
    Status : Status;
    Data: T | null;

    constructor(data: T | null, st: Status = Status.Success) {
        this.Data = data;
        this.Status = st;
    }
}

export const KiloByte = 1024;
export const MegaByte = 1024 * KiloByte;
export const GigaByte = 1024 * MegaByte;

@unmanaged
export class Options {
    /**
     * To get the data from external world, we need to allocate the memory before.
     * But we don't know how many memory must be allocated because the size of this data is not known
     * until the end of the "reading". To avoid double "reading" better to pre-allocate some temporary space,
     * and then reduce it to actual size.
     */
    TemporaryMemorySize: usize;

    private static DefaultOptions: Options;

    constructor(temporaryMemorySize: usize = MegaByte) {
        this.TemporaryMemorySize = temporaryMemorySize;
    }

    static Default(): Options {
        if (!this.DefaultOptions) {
            this.DefaultOptions = new Options();
        }

        return this.DefaultOptions;
    }
}

export abstract class Encodable {
    abstract encode(encoder: Encoder): void;

    toString(): string {
        const encoder = new Encoder();
        this.encode(encoder);

        return encoder.toString();
    }
}

export class Encoder extends JSONEncoder {
    pushObject(name: string | null = null, object: Encodable | null = null): bool {
        // @ts-ignore: decorator
        this.writeKey(name);

        if (object) {
            // @ts-ignore: decorator
            this._isFirstKey[this._isFirstKey.length - 1] = 1;
            object.encode(this);
        } else {
            // @ts-ignore: decorator
            this.write("{");
            // @ts-ignore: decorator
            this._isFirstKey.push(1);
        }
        return true;
    }

    setUInteger(name: string | null, value: u64): void {
        //@ts-ignore decorator
        this.writeKey(name);
        //@ts-ignore decorator
        this.write(value.toString());
    }

    setArray<T>(name: string | null, array: Array<T> | null): void {
        this.pushArray(name);

        if (array) {
            for (let i = 0; i < array.length; ++i) {
                if (isBoolean(array[i])) {
                    this.setBoolean(null, changetype<bool>(array[i]));
                } else if (isInteger(array[i])) {
                    if (isInteger<u8>(array[i])) {
                        this.setUInteger(null, changetype<u8>(array[i]));
                    } else if (isInteger<u16>(array[i])) {
                        this.setUInteger(null, changetype<u16>(array[i]));
                    } else if (isInteger<u32>(array[i])) {
                        this.setUInteger(null, changetype<u32>(array[i]));
                    } else if (isInteger<u64>(array[i])) {
                        this.setUInteger(null, changetype<u64>(array[i]));
                    } else if (isInteger<i8>(array[i])) {
                        this.setInteger(null, changetype<i8>(array[i]));
                    } else if (isInteger<i16>(array[i])) {
                        this.setInteger(null, changetype<i16>(array[i]));
                    } else if (isInteger<i32>(array[i])) {
                        this.setInteger(null, changetype<i32>(array[i]));
                    } else if (isInteger<i64>(array[i])) {
                        this.setInteger(null, changetype<i64>(array[i]));
                    }
                } else if (isString(array[i])) {
                    this.setString(null, changetype<string>(array[i]));
                } else if (array[i] instanceof Encodable) {
                    this.pushObject(null, changetype<Encodable>(array[i]));
                } else {
                    abort("Not supported type of object for json encoding");
                }
            }
        }

        this.popArray();
    }
}