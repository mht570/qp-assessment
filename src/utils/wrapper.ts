import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import logger from "./logger";

const isSuccess = (status: number): boolean => status >= 200 && status < 300;

const sendResponse = <T>(res: Response, { status = 200, data, message }: { status?: number; data?: T; message?: any }): Response => {
  return res.status(status).json({
    isSuccess: isSuccess(status),
    message,
    data,
  });
};

export const wrapErrHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      logger.error({ message: err });
      sendResponse(res, { status: 400, message: err.message });
    }
  };
};

export const wrapSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false }) as { error?: ValidationError };
    if (error) {
      const errorMessage = error && error.details ? error.details.map((currentValue) => currentValue.message) : [];

      sendResponse(res, {
        status: 400,
        message: errorMessage,
      });
    }
    next();
  };
};

export { sendResponse };
