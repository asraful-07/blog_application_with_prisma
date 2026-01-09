import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import postRoutes from "./modules/posts/post.routes";
import commentRoutes from "./modules/comments/comment.routes";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "*", //? http://localhost:3000
    credentials: true,
  })
);
app.use(express.json());

//* Routes
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

// app.use(notFound)
// app.use(errorHandler)

export default app;
