export type CommandType = BasicCommand | FlipCommand | CentimetersCommand | DegreesCommand

export class Command implements Commandable{
    readonly command: CommandType
    constructor(command: string ) {
        this.command = this.parse(command)
    }

    parse(command: string): CommandType {
        let candidate;
        try {
            try {
                candidate = new BasicCommand(command)
            } catch (e) {}

            try {
                candidate = new FlipCommand(command)
            } catch (e) {}

            try {
                candidate = new CentimetersCommand(command)
            } catch (e) {}

            try {
                candidate = new DegreesCommand(command)
            } catch (e) {}


        } catch (e) {

        } finally {
            if (candidate) {
               return candidate
            } else {
                throw Error(`unable to parse ${command}`)
            }
        }
    }

    toString(): string {
        return this.command.toString();
    }

    isReversible(): boolean {
        return this.command.isReversible();
    }

    reverse(): CommandType {
        return this.command.reverse();
    }

}

type BasicCommandType =
    "command" |
    "streamon" |
    "takeoff" |
    "land" |
    "flip"

export class BasicCommand implements Commandable, Reversible<BasicCommand> {
    readonly command: BasicCommandType
    readonly commands: BasicCommandType[] = ["command", "streamon", "takeoff", "land", "flip"]

    constructor(command: string) {
        this.command = this.parse(command)
    }

    toString(): string {
        return this.command;
    }

    isReversible(): boolean {
        return false
    };

    reverse(): BasicCommand {
        return this;
    }

    private parse(command: string) : BasicCommandType {
        const parsedCommand = this.commands.find(it => it === command);
        if (parsedCommand) {
            return parsedCommand
        } else {
            throw Error(`${command} is not a basic command`)
        }
    }
}

type FlipDirection = "f" | "b" | "l" | "r"

export class FlipCommand implements Commandable, Reversible<FlipCommand> {
    readonly flipCommand = "flip"
    readonly flipDirection: FlipDirection;

    readonly flipDirections: any[] =
        [
            {command: "f", reverse: "b"},
            {command: "b", reverse: "f"},
            {command: "l", reverse: "r"},
            {command: "r", reverse: "l"}
        ]

    constructor(flipCommand: string) {
        if (flipCommand.slice(0, 5) !== `flip `) {
            throw Error(`${flipCommand.slice(0, 5)} is not a flip command`)
        }
        try {
            const direction = flipCommand[5];
            this.flipDirection = this.parseDirection(direction);
        } catch (e) {
            console.log(e);
            throw Error(`${flipCommand} has no valid flip direction`);
        }

    }

    isReversible(): boolean {
        return true
    };

    reverse(): FlipCommand {
        return new FlipCommand(this.flipDirections.find(it => this.flipDirection === it.reverse))
    }

    toString() {
        return `${this.flipCommand} ${this.flipDirection}`
    }

    private parseDirection(command: string) : FlipDirection {
        const parsedCommand = this.flipDirections.find(it => it.command === command);
        if(parsedCommand) {
            return parsedCommand.command
        } else {
            throw Error(`${command} is not a flip command`)
        }
    }
}

type CentimetersCommandType =
    { command: "up", reverse: "down" } |
    { command: "down", reverse: "up" } |
    { command: "left", reverse: "right" } |
    { command: "right", reverse: "left" }

export class CentimetersCommand implements Commandable, Reversible<CentimetersCommand> {
    readonly centimetersCommand: CentimetersCommandType
    readonly centimeters: number

    readonly centimetersCommands: CentimetersCommandType[] =
        [
            {command: "up", reverse: "down"},
            {command: "down", reverse: "up"},
            {command: "left", reverse: "right"},
            {command: "right", reverse: "left"}
        ]

    constructor(command: string) {
        this.centimetersCommand = this.parseBase(command);
        this.centimeters = this.parseCentimeters(command);
    }

    isReversible(): boolean {
        return true
    };

    reverse(): CentimetersCommand {
        return new CentimetersCommand(`${this.centimetersCommands.find(it => this.centimetersCommand.command === it.command).reverse} ${this.centimeters}`)
    }

    toString() {
        return `${this.centimetersCommand.command} ${this.centimeters}`
    }

    parseBase(command: string): CentimetersCommandType {
        const parsedCommand = this.centimetersCommands.find(it => it.command === command.split(' ')[0]);
        if(parsedCommand) {
            return parsedCommand
        } else {
            throw Error(`${command} is not a centimeters command`)
        }
    }

    parseCentimeters(command: string) {
        const centi: number = parseInt(command.split(' ')[1])
        if (centi >= 20 && centi <= 500) {
            return centi;
        }
        throw Error(`${command} has invalid centimeters or not within rage`)
    }
}

type DegreesCommandType =
    { command: "cw", reverse: "ccw" } |
    { command: "ccw", reverse: "cw" }

export class DegreesCommand implements Commandable, Reversible<DegreesCommand> {
    readonly degreesCommand: DegreesCommandType
    readonly degrees: number

    readonly degreesCommands: DegreesCommandType[] =
        [
            {command: "cw", reverse: "ccw"},
            {command: "ccw", reverse: "cw"}
        ]

    constructor(command: string) {
        this.degreesCommand = this.parseBase(command);
        this.degrees = this.parseDegrees(command);
    }

    isReversible(): boolean {
        return true
    };

    reverse(): DegreesCommand {
        return new DegreesCommand(`${this.degreesCommands.find(it => this.degreesCommand.command === it.reverse)} ${this.degrees}`)
    }

    toString() {
        return `${this.degreesCommand.command} ${this.degrees}`
    }

    private parseBase(command: string): DegreesCommandType {
        const parsedCommand = this.degreesCommands.find(it => it.command === command.slice(0, 3).trimEnd());
        if(parsedCommand) {
            return parsedCommand
        } else {
            throw Error(`${command} is not a centimeters command`)
        }
    }

    parseDegrees(command: string) {
        const centi: number = parseInt(command.split(' ')[1])
        if (centi >= 1 && centi <= 360) {
            return centi;
        }
        throw Error(`${command} has invalid centimeters or not within rage`)
    }
}

interface Reversible<A> {
    isReversible(): boolean

    reverse(): A
}

interface Commandable {
    toString(): string
}
