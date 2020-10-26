import {extern} from "./env";
import {Status} from "./common";

export namespace utils {
    function debug(str: string): Status {
        const outData = String.UTF8.encode(str);
        const result = extern.write_log(changetype<usize>(outData), outData.byteLength);
        if (result < 0) {
            return Status.ErrorExternalFunctionExecution;
        }

        return Status.Success;
    }

    function ping(value: usize): usize {
        const result = extern.ping(value);
        if (result < 0) {
            // If we unavailable to execute ping functions it means
            // that something is wrong in environment and better abort execution.
            abort();
        }

        return result as usize;
    }

    function inc(): usize {
        const result = extern.inc();
        if (result < 0) {
            // If we unavailable to execute inc functions it means
            // that something is wrong in environment and better abort execution.
            abort();
        }

        return result as usize;
    }

    function constructor(f: () => void): Status {
        const result = extern.constructor();
        if (result < 0) {
            if (result == Status.ErrorConstructorFired) {
                return Status.ErrorConstructorFired;
            } else {
                return Status.ErrorExternalFunctionExecution;
            }
        }

        f();

        return Status.Success;
    }

    function init(f: () => void): Status {
        const result = extern.init();
        if (result < 0) {
            if (result == Status.ErrorInitFired) {
                return Status.ErrorInitFired;
            } else {
                return Status.ErrorExternalFunctionExecution;
            }
        }

        f();

        return Status.Success;
    }
}