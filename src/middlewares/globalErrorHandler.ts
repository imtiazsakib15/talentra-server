import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../config";

type ErrorSource = {
  path: string;
  message: string;
};
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (config.NODE_ENV === "development") {
    console.error("Global Error 💥", err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errorSources: ErrorSource[] = [];
  let stack = config.NODE_ENV === "development" ? err.stack : null;
  res.status(err.statusCode).json({ statusCode, message, errorSources, stack });
};

export default globalErrorHandler;
