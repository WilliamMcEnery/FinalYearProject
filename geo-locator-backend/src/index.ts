/**
 * Entry point for microservice
 */

// Load required modules
import dotenv from "dotenv";
import { Server } from "./server";
import express from "express";

// Load environment variables
dotenv.config();

// Create and run express server
const app = express();
const server = new Server(app);
server.run();
