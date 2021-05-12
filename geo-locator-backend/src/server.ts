// Load required modules
import * as express from "express";
import * as path from "path";
import {TweetGeoLocationService} from "./services/tweetGeoLocationService";
import {GeoCodingService} from "./services/geoCodingService";
import bodyParser from "body-parser";
import cors from "cors";

/**
 * This class is responsible providing the ability to create the
 * Express server and run the server.
 */
export class Server {

    private TweetGeoLocationService = new TweetGeoLocationService();
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
            console.log(`Received request for the topic: ${msg}`);

            const tweetLocations = await this.TweetGeoLocationService.getTweetLocations(msg);
            console.log("Received locations!");

            const geoCodedLocations = await this.GeoCodingService.getCoordinates(tweetLocations);

            res.send(geoCodedLocations);
            console.log("Returned geo-codes!\n");
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
