import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as WebSocket from "ws";

export class Server {

    private readonly server: http.Server

    constructor(private readonly app: express.Express) {
        const dir = path.join(__dirname, "../../geo-locator-ui/build/");
        
        this.app = app;

        // Set the static and views directory
        this.app.set("views",  dir);
        this.app.use(express.static(dir));
        this.app.get("*", (req: express.Request, res: express.Response): void => {
            res.sendFile("index.html", {root: dir});
        });

        //initialize a simple http server
        this.server = http.createServer(this.app);

        //initialize the WebSocket server instance
        const wss = new WebSocket.Server({ server: this.server });

        wss.on("connection", (ws: WebSocket) => {
            console.log("A new client Connected!");
            ws.send("Hello there!");

            ws.on("message", (msg: string) => {
                console.log("Received a message: " + msg);
            });
        });
    }

    public run(): void {
        const port = process.env.PORT || 8080;

        //start our server
        this.server.listen(port, () => {
            console.log("Server is listening on port " + port);
        });
    }
}
