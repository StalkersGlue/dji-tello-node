"use strict";
exports.__esModule = true;
exports.TestClient = void 0;
var command_1 = require("./command");
var TestClient = (function () {
    function TestClient(commandTimeoutInMilliseconds) {
        this.isFirstCommand = true;
        console.log("starting test Tello client");
        this.timeout_ms = commandTimeoutInMilliseconds;
    }
    TestClient.prototype.send = function (command) {
        try {
            this.parseCommand(command);
        }
        catch (e) {
            throw e;
        }
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("done");
                resolve();
            }, 500);
        });
    };
    TestClient.prototype.stop = function () {
        console.log('stopping test Tello client');
    };
    TestClient.prototype.parseCommand = function (command) {
        var parsedCommand;
        try {
            parsedCommand = new command_1.Command(command);
        }
        catch (e) {
            throw Error("".concat(command, " is not a valid command"));
        }
        if (this.isFirstCommand) {
            var commandCommand = new command_1.Command("command");
            if (parsedCommand.command.toString() !== new command_1.Command("command").command.toString()) {
                throw Error("first command should be the \"command\" ".concat(commandCommand));
            }
            this.isFirstCommand = false;
        }
        return parsedCommand;
    };
    return TestClient;
}());
exports.TestClient = TestClient;
//# sourceMappingURL=testClient.js.map