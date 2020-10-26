import { utils, storage } from "../assembly/index";

export function storage_app(): i64 {
    const name = "helloWorld.txt";
    const data = "Hello world data to file.";
    const dataByte = String.UTF8.encode(data);
    storage.save(name, dataByte);

    const result = storage.load(name);
    utils.debug(String.UTF8.decode(result.Data!));
    utils.debug("Strings are equal = " + (String.UTF8.decode(result.Data!) == data).toString());

    return 0;
}