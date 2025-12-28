import express, { Application, Request, Response } from "express";
import postRoutes from "./modules/posts/post.routes";

const app: Application = express();
// app.use(cors());
app.use(express.json());

//* Routes
app.use("/api", postRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server running" });
});

export default app;
