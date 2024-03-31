import { createLogger, format, transports } from "winston";
import * as appRoot from "app-root-path";
import DailyRotateFile from "winston-daily-rotate-file";
import * as dotenv from "dotenv";

dotenv.config();

const errorFilter = format((info, opts) => {
  if (process.env.NODE_ENV) return info.level == "info" ? info : false;
  return false;
});

const debugFilter = format((info, opts) => {
  if (`${process.env.NODE_ENV}` == "preprod") return info.level == "debug" ? info : false;
  return false;
});

const logger = createLogger({
  level: "info",

  // Default level
  format: format.combine(
    format.splat(),
    format.simple(),
    format.json(),
    format.timestamp(),
    format.printf((info: any) => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  transports: [
    new DailyRotateFile({
      filename: `${appRoot}/Log/error/Error-%DATE%.log`,
      level: "error",
      handleExceptions: true,
      json: true,
      datePattern: "YYYY-MM-DD",
    }),

    new DailyRotateFile({
      filename: `${appRoot}/Log/info/Info-%DATE%.log`,
      level: "info",
      handleExceptions: true,
      json: true,
      datePattern: "YYYY-MM-DD",
      format: errorFilter(),
    }),

    new DailyRotateFile({
      filename: `${appRoot}/Log/payload/Debug-%DATE%.log`,
      level: "debug",
      handleExceptions: true,
      json: true,
      datePattern: "YYYY-MM-DD",
      format: debugFilter(),
    }),

    new transports.Console({
      level: "error",
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

export default logger;
