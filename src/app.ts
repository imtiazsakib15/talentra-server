import express, { Request, Response } from "express";
import cors from "cors";
import prisma from "./prisma/client";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true });
});

export default app;
