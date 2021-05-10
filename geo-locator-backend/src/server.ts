// Load required modules
import * as express from "express";
import * as path from "path";
import {TweetGeoLocationService} from "./services/tweetGeoLocationService";
import {ConsumerClient} from "./client/consumerClient";
import {GeoCodingService} from "./services/geoCodingService";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

/**
 * This class is responsible providing the ability to create the
 * Express server and run the server.
 */
export class Server {

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

        app.get("/api/getTweets", async (req, res) => {
            const msg = req.query.topic as string;
            const consumerUrl = await this.consumerClient.getKafkaConsumerInstance();
            console.log(consumerUrl);
            await this.TweetGeoLocationService.produceRecord(msg);

            console.log("Consuming messages...");

            /**
             * Consume records
             */
            let gotRecord = false;

            while (!gotRecord) {
                await fetch(`${consumerUrl}/records?timeout=3000&max_bytes=300000`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/vnd.kafka.json.v2+json"
                    }
                })
                    .then(async result => {
                        const data = await result.json();
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].value.topic.slice(1,-1) === msg) {
                                console.log(`Received the locations for: ${msg}`);
                                const geoCodedLocations = await this.GeoCodingService.getCoordinates(data[i].value);
                                console.log("Sending Co-ordinates...");
                                res.send(JSON.stringify(geoCodedLocations));
                                this.consumerClient.deleteClientInstance();
                                gotRecord = true;
                            }
                        }
                    })
                    .catch(err => {
                        console.log(`Error reading records: \n${err}`);
                    });
            }
        });
    }

    /**
     * This function is responsible for running the Express server on the provided port.
     */
    public run(): void {
        const port = process.env.PORT || 8080;

        // start our server
        this.app.listen(port, () => {
            console.log("Server is listening on port " + port + "\n");
        });
    }
}
