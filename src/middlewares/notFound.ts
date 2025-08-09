import e, { Request, Response } from "express";

const notFound = async (req: Request, res: Response) => {
  res.send({ success: false, message: `Route '${req.url}' not found` });
};

export default notFound;
