import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as WebSocket from "ws";
import kafkaProducerClient from "./client/kafkaProducerClient";
import {TweetGeoLocationService} from "./services/tweetGeoLocationService";
import {ConsumerClient} from "./client/consumerClient";
import {EachMessagePayload} from "kafkajs";

export class Server {

    private readonly server: http.Server
    private TweetGeoLocationService = new TweetGeoLocationService();
    private consumerClient = new ConsumerClient();

    constructor(private readonly app: express.Express) {
        const dir = path.join(__dirname, "../../geo-locator-ui/build/");
        
        this.app = app;

        // Set the static and views directory
        this.app.set("views",  dir);
        this.app.use(express.static(dir));
        this.app.get("*", (req: express.Request, res: express.Response): void => {
            res.sendFile("index.html", {root: dir});
        });

        // initialize a simple http server
        this.server = http.createServer(this.app);

        // initialize the Kafka producer instance
        new kafkaProducerClient();

        // initialize the WebSocket server instance
        const wss = new WebSocket.Server({ server: this.server });

        wss.on("connection",  (ws: WebSocket) => {
            console.log("New client Connected!");
            ws.send("Connected...");

            ws.on("message", async (msg: string) => {
                const kitty = await this.consumerClient.getKafkaConsumerInstance();
                await this.TweetGeoLocationService.getGeoLocations(msg);

                await kitty.run({
                    eachMessage: async (result: EachMessagePayload) => {
                        const data = JSON.parse(`${result.message.value}`);
                        if (data.topic == msg) {
                            console.log(`Received the locations for: ${msg}`);
                            ws.send(`${result.message.value}`);
                            await kitty.disconnect();
                        }
                    }
                });
            });
            ws.on("close", () => console.log("Client has disconnected"));
        });
    }

    public run(): void {
        const port = process.env.PORT || 8080;

        // start our server
        this.server.listen(port, () => {
            console.log("Server is listening on port " + port);
        });
    }
}
