import { extern } from "./env";
import {Options, Result, Status} from "./common";
import {loadData} from "./internal"
import {JSONEncoder} from "assemblyscript-json"

export namespace network {
    class HttpRequest {
        url: string;
        headers: Map<string,string>;
        constructor(url: string) {
            this.url = url;
            this.headers = new Map<string,string>();
        }

        toString(): string {
            const encoder = new JSONEncoder();
            encoder.pushObject(null);
            encoder.setString("url", this.url);
            encoder.pushObject("headers");

            const keys = this.headers.keys();
            for (let i = 0; i < keys.length; ++i) {
                encoder.setString(keys[i], this.headers.get(keys[i]));
            }
            encoder.popObject();
            encoder.popObject();

            return encoder.toString();
        }

        send(op: Options = Options.Default()): Result<ArrayBuffer> {
            const reqStr = this.toString();
            const reqByte = String.UTF8.encode(reqStr);

            const reqPtr = changetype<usize>(reqByte);
            const reqLen = reqByte.byteLength;

            const f = function(args: usize[]): i64 {
                const result: i64 = extern.get_http(args[0], args[1], args[2]);

                return result;
            };
            return loadData(op, f, [reqPtr, reqLen]);
        }
    }
}