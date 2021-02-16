// Load required modules
import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as WebSocket from "ws";
import kafkaProducerClient from "./client/kafkaProducerClient";
import {TweetGeoLocationService} from "./services/tweetGeoLocationService";
import {ConsumerClient} from "./client/consumerClient";
import {EachMessagePayload} from "kafkajs";
import {GeoCodingService} from "./services/geoCodingService";

/**
 * This class is responsible providing the ability to create the
 * Express server and run the server.
 */
export class Server {

    private readonly server: http.Server
    private TweetGeoLocationService = new TweetGeoLocationService();
    private consumerClient = new ConsumerClient();
    private GeoCodingService = new GeoCodingService();

    /**
     * Constructor of the NodeJS Express Server
     *
     * @param app NodeJS Express Application object
     */
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

        // on new websocket connection
        wss.on("connection",  (ws: WebSocket) => {
            console.log("New client Connected!");
            const connected = [{name: "Connected", latitude: 0, longitude: 0}];
            ws.send(connected);

            // on message received from websocket
            ws.on("message", async (msg: string) => {
                const consumer = await this.consumerClient.getKafkaConsumerInstance();
                await this.TweetGeoLocationService.produceRecord(msg);

                await consumer.run({
                    eachMessage: async (result: EachMessagePayload) => {
                        console.log("Consuming messages...");
                        const data = JSON.parse(`${result.message.value}`);
                        if (data.topic == msg) {
                            console.log(`Received the locations for: ${msg}`);
                            const res = await this.GeoCodingService.getCoordinates(data);
                            console.log("Sending Co-ordinates...");
                            ws.send(JSON.stringify(res));
                            console.log("Consumer disconnected!");
                            await consumer.disconnect();
                        }
                    }
                });
            });
            ws.on("close", () => console.log("Client has disconnected"));
        });
    }

    /**
     * This function is responsible for running the Express server on the provided port.
     */
    public run(): void {
        const port = process.env.PORT || 8080;

        // start our server
        this.server.listen(port, () => {
            console.log("Server is listening on port " + port);
        });
    }
}
