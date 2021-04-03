const singleton: unique symbol = Symbol("client-websocket");

/**
 * This class is responsible providing a shared instance of a Websocket Client.
 */
// eslint-disable-next-line
export default class {
    private websocket!: WebSocket;

    constructor() {
        const Class = new.target;

        // @ts-ignore
        if (!Class[singleton]) {
            // @ts-ignore
            Class[singleton] = this;
        }
        // @ts-ignore
        return Class[singleton];
    }

    /**
     * Method to create and return a websocket instance
     */
    private getClient(): WebSocket {
        if (!this.websocket) {
            try {
                // const websocketUrl = `ws://${process.env.REACT_APP_WEBSOCKET_HOST}:${process.env.REACT_APP_WEBSOCKET_PORT_NUMBER}`
                const websocketUrl = `ws://geo-locator-service:${process.env.REACT_APP_WEBSOCKET_PORT_NUMBER}`
                // Create WebSocket connection.
                this.websocket = new WebSocket(websocketUrl as string);

                // Connection opened
                this.websocket.addEventListener("open", function (event) {
                    console.log("Connected to WS Server");
                });

                console.log("Successfully created websocket client");
            } catch (err) {
                console.log("Failed to create websocket client", err.stack || err);
                throw new Error();
            }
        }
        return this.websocket;
    }

    /**
     * Method to call private getClient method and return the websocket instance
     */
    public getWebsocketInstance(): WebSocket {
        try {
            return this.getClient();
        } catch (err) {
            throw err;
        }
    }
}