import * as udp from "dgram";
import {Buffer} from "buffer";
import {EventEmitter, once} from "events";
import {TelloClient} from "./telloClient";

export class LiveClient implements TelloClient {
    readonly commandSocket = 9000;
    readonly metricSocket = 8890;
    readonly DRONE_PORT = 8889;
    readonly DRONE_ADDRESS = '192.168.10.1';
    readonly commandSuccessEmitter = new EventEmitter();

    readonly commandClient = udp.createSocket('udp4').bind(this.commandSocket);
    readonly metricClient = udp.createSocket('udp4').bind(this.metricSocket);

    readonly timeout_ms;

    constructor(commandTimeoutInMilliseconds: number) {
        this.timeout_ms = commandTimeoutInMilliseconds;
        this.commandClient.on('message', (msg, info) => {
            const message: string = Buffer.from(msg).toString();
            this.commandSuccessEmitter.emit(message);
        })

        this.metricClient.on('message', (message, info) => {
            // Todo
            console.log(message.toString().split(";").find(it => it.split(":")[0] === "bat"));
        })

    }

    async send(command: string): Promise<void> {
        this.commandClient.send(Buffer.from(command), this.DRONE_PORT, this.DRONE_ADDRESS);

        return new Promise(async (resolve, reject) => {
            const timeout = setTimeout(() => {
                return reject();
            }, this.timeout_ms);

            once(this.commandSuccessEmitter, "ok").then(() => {
                clearTimeout(timeout);
                console.log(`${command} successful`);
                return resolve();
            });
        })
    }

    stop() {
        this.commandClient.close();
        this.metricClient.close();
    }
}