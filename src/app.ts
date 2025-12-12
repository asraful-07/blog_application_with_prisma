import express, { Request, Response } from "express";

export const app = express();
app.use(express.json());

//* Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server running" });
});
