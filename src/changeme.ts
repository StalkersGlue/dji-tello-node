import {TelloClient} from "./client/telloClient";

export async function changeme(client: TelloClient) {
    await client.send("something")
}