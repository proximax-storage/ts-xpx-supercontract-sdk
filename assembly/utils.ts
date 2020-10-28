import {extern} from "./env";
import {Status} from "./common";

export namespace utils {
    /**
     * Log some information to output of replicator
     *
     * @param {string} str - string to log
     * @returns {Status} status of this operation
     */
    export function debug(str: string): Status {
        const outData = String.UTF8.encode(str);
        const result = extern.write_log(changetype<usize>(outData), outData.byteLength);
        if (result < 0) {
            return Status.ErrorExternalFunctionExecution;
        }

        return Status.Success;
    }

    /**
     * Simple ping-pong function to check environment
     *
     * @param {usize} value - value which will be increased by one
     * @returns {usize} increased value
     */
    export function ping(value: usize): usize {
        const result = extern.ping(value);
        if (result < 0) {
            // If we unavailable to execute ping functions it means
            // that something is wrong in environment and better abort execution.
            abort();
        }

        return result as usize;
    }

    /**
     * Simple increment function, which increase inner counter of environment
     *
     * @returns {usize} current value of counter
     */
    export function inc(): usize {
        const result = extern.inc();
        if (result < 0) {
            // If we unavailable to execute inc functions it means
            // that something is wrong in environment and better abort execution.
            abort();
        }

        return result as usize;
    }

    /**
     * Constructor is executed only one time during life of super contract
     *
     * @param {() => void} f - function which must be executed(constructor function)
     * @returns {Status} status of this operation
     */
    export function constructor(f: () => void): Status {
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

    /**
     * Init is executed only one time per execution of function in super contract
     *
     * @param {() => void} f - function which must be executed
     * @returns {Status} status of this operation
     */
    export function init(f: () => void): Status {
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