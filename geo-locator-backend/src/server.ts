// Load required modules
import * as express from "express";
import * as path from "path";
import kafkaProducerClient from "./client/kafkaProducerClient";
import {TweetGeoLocationService} from "./services/tweetGeoLocationService";
import {ConsumerClient} from "./client/consumerClient";
import {EachMessagePayload} from "kafkajs";
import {GeoCodingService} from "./services/geoCodingService";
import bodyParser from "body-parser";
import cors from "cors";

/**
 * This class is responsible providing the ability to create the
 * Express server and run the server.
 */
export class Server {

    // private readonly server: http.Server
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

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.use(cors());

        // Set the static and views directory
        this.app.set("views",  dir);
        this.app.use(express.static(dir));
        this.app.get("/", (req: express.Request, res: express.Response): void => {
            res.sendFile("index.html", {root: dir});
        });

        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            next();
        });

        // initialize the Kafka producer instance
        new kafkaProducerClient();

        app.get("/api/getTweets", async (req, res) => {
            const msg = req.query.topic as string;
            const consumer = await this.consumerClient.getKafkaConsumerInstance();
            await this.TweetGeoLocationService.produceRecord(msg);

            await consumer.run({
                eachMessage: async (result: EachMessagePayload) => {
                    console.log("Consuming messages...");
                    const data = JSON.parse(`${result.message.value}`);
                    if (data.topic == msg) {
                        console.log(`Received the locations for: ${msg}`);
                        const result = await this.GeoCodingService.getCoordinates(data);
                        console.log("Sending Co-ordinates...");
                        res.send(JSON.stringify(result));
                        console.log("Consumer disconnected!");
                        await consumer.disconnect();
                    }
                }
            });
        });
    }

    /**
     * This function is responsible for running the Express server on the provided port.
     */
    public run(): void {
        const port = process.env.PORT || 8080;

        // start our server
        this.app.listen(port, () => {
            console.log("Server is listening on port " + port);
        });
    }
}
