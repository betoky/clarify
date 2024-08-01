import { onCall } from "firebase-functions/v1/https";
import * as logger from "firebase-functions/logger";

export const sayHello = onCall((data: string, context) => {
    logger.info("Say hello", {data});
    return `Hello ${data} !`
});