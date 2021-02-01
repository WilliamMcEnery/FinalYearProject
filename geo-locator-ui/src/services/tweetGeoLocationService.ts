import websocketClient from "../client/websocketClient";

export class TweetGeoLocationService {
    private ws = new websocketClient().getWebsocketInstance();

    public async getLocations(topic: string) {
        this.ws.send(topic);
        return (
            "hello it was a success!"
        )
    }
}
