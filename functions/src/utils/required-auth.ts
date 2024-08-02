import { CallableContext, HttpsError } from "firebase-functions/v1/https";

export const requiredAuth = (context: CallableContext) => {
    if (!context.auth) {
        throw new HttpsError("unauthenticated", "401 Unauthorized")
    }
}