import express, { Application } from "express";
import postRoutes from "./modules/posts/post.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

//* Routes
app.use("/api", postRoutes);

export default app;
