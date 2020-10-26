import {extern} from "./env";
import {Options, Result, Status} from "./common";
import {loadData} from "./internal"

export namespace storage {
    function save(path: string, data: ArrayBuffer): Status {
        const pathBytes = String.UTF8.encode(path);
        const result = extern.save_sc_result(changetype<usize>(pathBytes), pathBytes.byteLength, changetype<usize>(data), data.byteLength);
        if (result < 0) {
            return Status.ErrorExternalFunctionExecution;
        }

        return Status.Success;
    }

    function load(path: string, op: Options = Options.Default()): Result<ArrayBuffer> {
        const pathBytes = String.UTF8.encode(path);
        const f = function(args: usize[]): i64 {
            const result: i64 = extern.get_from_storage(args[0], args[1], args[2]);

            return result;
        };
        return loadData(op, f, [changetype<usize>(pathBytes), pathBytes.byteLength as usize]);
    }
}