import { utils, Status } from "../assembly/index";

export function helloworld(): i64 {
    let n : usize = 99;
    let result = utils.ping(n);
    utils.debug("Hello world " + result.toString());

    return Status.Success;
}