import {LiveClient} from "./client/liveClient";
import {changeme} from "./changeme";
import {TelloClient} from "./client/telloClient";
import {TestClient} from "./client/testClient";


const timeout = 10_000;

const client: TelloClient =  process.argv.find(it => it === "live") ?
    new LiveClient(timeout) : new TestClient(timeout);

    changeme(client)
    .then(() => console.log("commands completed!"))
    .catch(reason => console.log(`command failed! ${reason ? reason : 'Are you connected to the Tello WiFi?'}`))
    .finally(() => {
        client.stop();
    });