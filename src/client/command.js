"use strict";
exports.__esModule = true;
exports.DegreesCommand = exports.CentimetersCommand = exports.FlipCommand = exports.BasicCommand = exports.Command = void 0;
var Command = (function () {
    function Command(command) {
        this.command = this.parse(command);
    }
    Command.prototype.parse = function (command) {
        var candidate;
        try {
            try {
                candidate = new BasicCommand(command);
            }
            catch (e) { }
            try {
                candidate = new FlipCommand(command);
            }
            catch (e) { }
            try {
                candidate = new CentimetersCommand(command);
            }
            catch (e) { }
            try {
                candidate = new DegreesCommand(command);
            }
            catch (e) { }
        }
        catch (e) {
        }
        finally {
            if (candidate) {
                return candidate;
            }
            else {
                throw Error("unable to parse ".concat(command));
            }
        }
    };
    Command.prototype.toString = function () {
        return this.command.toString();
    };
    Command.prototype.isReversible = function () {
        return this.command.isReversible();
    };
    Command.prototype.reverse = function () {
        return this.command.reverse();
    };
    return Command;
}());
exports.Command = Command;
var BasicCommand = (function () {
    function BasicCommand(command) {
        this.commands = ["command", "streamon", "takeoff", "land", "flip"];
        this.command = this.parse(command);
    }
    BasicCommand.prototype.toString = function () {
        return this.command;
    };
    BasicCommand.prototype.isReversible = function () {
        return false;
    };
    ;
    BasicCommand.prototype.reverse = function () {
        return this;
    };
    BasicCommand.prototype.parse = function (command) {
        var parsedCommand = this.commands.find(function (it) { return it === command; });
        if (parsedCommand) {
            return parsedCommand;
        }
        else {
            throw Error("".concat(command, " is not a basic command"));
        }
    };
    return BasicCommand;
}());
exports.BasicCommand = BasicCommand;
var FlipCommand = (function () {
    function FlipCommand(flipCommand) {
        this.flipCommand = "flip";
        this.flipDirections = [
            { command: "f", reverse: "b" },
            { command: "b", reverse: "f" },
            { command: "l", reverse: "r" },
            { command: "r", reverse: "l" }
        ];
        if (flipCommand.slice(0, 5) !== "flip ") {
            throw Error("".concat(flipCommand.slice(0, 5), " is not a flip command"));
        }
        try {
            var direction = flipCommand[5];
            this.flipDirection = this.parseDirection(direction);
        }
        catch (e) {
            console.log(e);
            throw Error("".concat(flipCommand, " has no valid flip direction"));
        }
    }
    FlipCommand.prototype.isReversible = function () {
        return true;
    };
    ;
    FlipCommand.prototype.reverse = function () {
        var _this = this;
        return new FlipCommand(this.flipDirections.find(function (it) { return _this.flipDirection === it.reverse; }));
    };
    FlipCommand.prototype.toString = function () {
        return "".concat(this.flipCommand, " ").concat(this.flipDirection);
    };
    FlipCommand.prototype.parseDirection = function (command) {
        var parsedCommand = this.flipDirections.find(function (it) { return it.command === command; });
        if (parsedCommand) {
            return parsedCommand.command;
        }
        else {
            throw Error("".concat(command, " is not a flip command"));
        }
    };
    return FlipCommand;
}());
exports.FlipCommand = FlipCommand;
var CentimetersCommand = (function () {
    function CentimetersCommand(command) {
        this.centimetersCommands = [
            { command: "up", reverse: "down" },
            { command: "down", reverse: "up" },
            { command: "left", reverse: "right" },
            { command: "right", reverse: "left" }
        ];
        this.centimetersCommand = this.parseBase(command);
        this.centimeters = this.parseCentimeters(command);
    }
    CentimetersCommand.prototype.isReversible = function () {
        return true;
    };
    ;
    CentimetersCommand.prototype.reverse = function () {
        var _this = this;
        return new CentimetersCommand("".concat(this.centimetersCommands.find(function (it) { return _this.centimetersCommand.command === it.reverse; }), " ").concat(this.centimeters));
    };
    CentimetersCommand.prototype.toString = function () {
        return "".concat(this.centimetersCommand.command, " ").concat(this.centimetersCommand);
    };
    CentimetersCommand.prototype.parseBase = function (command) {
        var parsedCommand = this.centimetersCommands.find(function (it) { return it.command === command.split(' ')[0]; });
        if (parsedCommand) {
            return parsedCommand;
        }
        else {
            throw Error("".concat(command, " is not a centimeters command"));
        }
    };
    CentimetersCommand.prototype.parseCentimeters = function (command) {
        var centi = parseInt(command.split(' ')[1]);
        if (centi >= 20 && centi <= 500) {
            return centi;
        }
        throw Error("".concat(command, " has invalid centimeters or not within rage"));
    };
    return CentimetersCommand;
}());
exports.CentimetersCommand = CentimetersCommand;
var DegreesCommand = (function () {
    function DegreesCommand(command) {
        this.degreesCommands = [
            { command: "cw", reverse: "ccw" },
            { command: "ccw", reverse: "cw" }
        ];
        this.degreesCommand = this.parseBase(command);
        this.degrees = this.parseDegrees(command);
    }
    DegreesCommand.prototype.isReversible = function () {
        return true;
    };
    ;
    DegreesCommand.prototype.reverse = function () {
        var _this = this;
        return new DegreesCommand("".concat(this.degreesCommands.find(function (it) { return _this.degreesCommand.command === it.reverse; }), " ").concat(this.degrees));
    };
    DegreesCommand.prototype.toString = function () {
        return "".concat(this.degreesCommand.command, " ").concat(this.degrees);
    };
    DegreesCommand.prototype.parseBase = function (command) {
        var parsedCommand = this.degreesCommands.find(function (it) { return it.command === command.slice(0, 3).trimEnd(); });
        if (parsedCommand) {
            return parsedCommand;
        }
        else {
            throw Error("".concat(command, " is not a centimeters command"));
        }
    };
    DegreesCommand.prototype.parseDegrees = function (command) {
        var centi = parseInt(command.split(' ')[1]);
        if (centi >= 1 && centi <= 360) {
            return centi;
        }
        throw Error("".concat(command, " has invalid centimeters or not within rage"));
    };
    return DegreesCommand;
}());
exports.DegreesCommand = DegreesCommand;
//# sourceMappingURL=command.js.map