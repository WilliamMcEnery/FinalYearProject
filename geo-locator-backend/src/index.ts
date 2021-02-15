/**
 * Entry point for microservice
 */

// Load required modules
import { Server } from "./server";
import express from "express";
const app = express();

const server = new Server(app);
server.run();
