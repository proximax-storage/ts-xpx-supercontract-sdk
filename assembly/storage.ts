import {extern} from "./env";
import {Options, Result, Status} from "./common";
import {loadData} from "./internal"

export namespace storage {
    /**
     * Save data to file on the drive.
     *
     * @param {string} path - path to file
     * @param {ArrayBuffer} data - data which must be stored in file
     * @returns {Status} status of this operation
     */
    export function save(path: string, data: ArrayBuffer): Status {
        const pathBytes = String.UTF8.encode(path);
        const result = extern.save_sc_result(changetype<usize>(pathBytes), pathBytes.byteLength, changetype<usize>(data), data.byteLength);
        if (result < 0) {
            return Status.ErrorExternalFunctionExecution;
        }

        return Status.Success;
    }

    /**
     * Load data from file on drive
     *
     * @param {string} path - path to file
     * @param {Options} op - options which must be used during execution
     * @returns {Result<ArrayBuffer>} the result of load operation. If result is successful,
     * Result.Data will contains bytes from file
     */
    export function load(path: string, op: Options = Options.Default()): Result<ArrayBuffer> {
        const pathBytes = String.UTF8.encode(path);
        const f = function(args: usize[]): i64 {
            const result: i64 = extern.get_from_storage(args[0], args[1], args[2]);

            return result;
        };
        return loadData(op, f, [changetype<usize>(pathBytes), pathBytes.byteLength as usize]);
    }
}