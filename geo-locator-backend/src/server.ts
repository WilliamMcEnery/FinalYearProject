import * as express from "express";
import * as path from "path";

export class Server {

    constructor(private app: express.Express) {
        this.app = app;

        this.app.use(express.static(path.resolve("./") + "/build/"));

        this.app.get("*", (req: express.Request, res: express.Response): void => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }

    public run(): void {
        this.app.listen(process.env.PORT, () => console.log("Server listening on port " + process.env.PORT));
    }
}
