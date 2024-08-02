import { HttpsError } from "firebase-functions/v1/https";
import * as logger from "firebase-functions/logger";
import { INTERNAL_ERROR } from "../constants/errors";

export const internalError = (e: unknown) => {
    logger.error('++ Internal error', {error: e}, new Date())
    throw new HttpsError('internal', INTERNAL_ERROR);
}