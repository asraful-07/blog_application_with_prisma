import express, { Application, Request, Response } from "express";

const app: Application = express();
// app.use(cors());
app.use(express.json());

//* Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server running" });
});

export default app;
