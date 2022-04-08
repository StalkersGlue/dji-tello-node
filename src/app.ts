import * as udp from "dgram";
import {Buffer} from "buffer";
import {EventEmitter, once} from "events";

class App {
    readonly commandSocket = 9000;
    readonly metricSocket = 8890;
    readonly DRONE_PORT = 8889;
    readonly DRONE_ADDRESS = '192.168.10.1';
    readonly commandSuccessEmitter = new EventEmitter();

    readonly commandClient = udp.createSocket('udp4').bind(this.commandSocket);
    readonly metricClient = udp.createSocket('udp4').bind(this.metricSocket);

    constructor() {
        this.commandClient.on('message', (msg, info) => {
            const message: string = Buffer.from(msg).toString();
            console.log(message);
            this.commandSuccessEmitter.emit(message);
        })

        this.metricClient.on('message', (message, info) => {
            // console.log(message.toString().split(";").find(it => it.split(":")[0] === "yaw"));
        })

    }

    async sendCommand(command: Command | string): Promise<void> {

        const timeout_ms = 10_000;

        this.commandClient.send(Buffer.from(command), this.DRONE_PORT, this.DRONE_ADDRESS);

        return new Promise(async (resolve, reject) => {
            const timeout = setTimeout(() => {
                return reject(`${command} timed out after ${timeout_ms} ms`)
            }, timeout_ms);

            once(this.commandSuccessEmitter, "ok").then(() => {
                clearTimeout(timeout);
                return resolve();
            });
        })

    }

    kill() {
        this.commandClient.close();
        this.metricClient.close();
    }

}

const app = new App();

const run = async () => {
    await app.sendCommand("command");
    await app.sendCommand("takeoff");
    await app.sendCommand("land");
}

run()
    .then(() => console.log("commands completed!"))
    .catch(reason => console.log(`command ${reason}`))
    .finally(() => {
        app.kill();
    });

type Command = "command" | "takeoff" | "land" | "flip f" | "emergency" | "up 150" | "down 30" | "forward 30" | "cw 92";