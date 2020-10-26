import {Options, Result, Status} from "./common";

export { extern } from "./env";
export * from "./common";

export function loadData(op: Options, f: (args: usize[]) => i64, args: usize[]): Result<ArrayBuffer> {
    let arrayPtr = __alloc(op.TemporaryMemorySize, idof<ArrayBuffer>());
    if (!arrayPtr) {
        return new Result<ArrayBuffer>(null, Status.ErrorMemoryAllocation);
    }
    args.push(arrayPtr);

    const size = f(args);
    if (size < 0) {
        __free(arrayPtr);
        return new Result<ArrayBuffer>(null, Status.ErrorExternalFunctionExecution);
    }

    arrayPtr = __realloc(arrayPtr, size as usize);
    if (!arrayPtr) {
        return new Result<ArrayBuffer>(null, Status.ErrorMemoryReallocation);
    }

    return new Result<ArrayBuffer>(changetype<ArrayBuffer>(arrayPtr));
}