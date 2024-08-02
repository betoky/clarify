import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v1/https";
import { requiredAuth } from "./utils/required-auth";
import { internalError } from "./utils/internal-error";

initializeApp();

const db = getFirestore();


export const fullStatsOfYear = onCall(async (year: number, context) => {
    requiredAuth(context);

    const jan = new Date(year, 0);
    const dec = new Date(year, 11, 31, 23, 59, 59);

    try {
        const snap = await db.collection('principal').doc('bank').collection('transactions')
        .where('date', '>=', jan)
        .where('date', '<=', dec)
        .get();
    
        if (snap.empty || snap.size === 0) {
            return [];
        }
    
        return snap.docs.map(doc => ({id: doc.id, ...doc.data()}));

    } catch (e) {
        return internalError(e);
    }
})
