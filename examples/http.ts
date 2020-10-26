import { network, utils, Options, KiloByte, Status } from "../assembly/index";

export function http_app(): i64 {
    const req = new network.HttpRequest("https://assets.whitepaper.io/documents/Bkm4NFf3E/images/1-47868af04a.png");
    req.headers.set("content-type", "text/html");
    utils.debug(req.toString());

    // We know that this image around ~431 kilobytes
    const result = req.send(new Options(431 * KiloByte));
    utils.debug(result.Data!.byteLength.toString());
    utils.debug(String.UTF8.decode(result.Data!));

    return Status.Success;
}