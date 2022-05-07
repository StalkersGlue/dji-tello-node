import {TelloClient} from "./telloClient";
import {Command} from "./command";

export class TestClient implements TelloClient {

    readonly timeout_ms: number;
    isFirstCommand: boolean = true;

    constructor(commandTimeoutInMilliseconds: number) {
        console.log("starting test Tello client")
        this.timeout_ms = commandTimeoutInMilliseconds;
    }

    send(command: string): Promise<void> {
        try {
            this.parseCommand(command)
        } catch (e) {
            throw e
        }

        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                console.log("done")
                resolve();
            }, 500)
        })

    }

    stop(): void {
        console.log('stopping test Tello client')
    }

    private parseCommand(command: string): Command {
        let  parsedCommand: Command
        try {
            parsedCommand = new Command(command);
        } catch (e) {
            throw Error(`${command} is not a valid command`)
        }

        if (this.isFirstCommand) {
            const commandCommand = new Command("command")
           if (parsedCommand.command.toString() !== new Command("command").command.toString()) {
               throw Error(`first command should be the \"command\" ${commandCommand}`)
           }
           this.isFirstCommand = false;
        }

        return parsedCommand
    }

    getStatus(): Promise<string> {
        return Promise.resolve("pitch:0;roll:0;yaw:0;vgx:0;vgy:0;vgz:0;templ:82;temph:83;tof:10;h:0;bat:32;baro:-86.90;time:0;agx:-7.00;agy:-17.00;agz:-998.00;");
    }

}