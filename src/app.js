"use strict";
exports.__esModule = true;
var liveClient_1 = require("./client/liveClient");
var changeme_1 = require("./changeme");
var testClient_1 = require("./client/testClient");
var timeout = 10000;
var client = process.argv.find(function (it) { return it === "live"; }) ?
    new liveClient_1.LiveClient(timeout) : new testClient_1.TestClient(timeout);
(0, changeme_1.changeme)(client)
    .then(function () { return console.log("commands completed!"); })["catch"](function (reason) { return console.log("command failed! ".concat(reason ? reason : 'Are you connected to the Tello WiFi?')); })["finally"](function () {
    client.stop();
});
//# sourceMappingURL=app.js.map