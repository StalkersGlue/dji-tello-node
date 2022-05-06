import {TelloClient} from "./client/telloClient";
import {Command} from "./client/command";

export async function changeme(client: TelloClient) {
    await client.send("command")
    await client.send(new Command("up 20").toString())
}