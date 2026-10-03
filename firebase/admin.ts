import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import { getStorage, Storage } from "firebase-admin/storage";

let adminApp: App | undefined;
let adminAuth: Auth | undefined;
let adminDb: Firestore | undefined;
let adminStorage: Storage | undefined;

const initFirebase = () => {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (privateKey) {
        privateKey = privateKey.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
    }

    if (projectId && clientEmail && privateKey) {
        try {
            const existingApp = getApps().find(a => a.name === "prepwise-admin");
            if (existingApp) {
                adminApp = existingApp;
            } else {
                adminApp = initializeApp({
                    credential: cert({
                        projectId,
                        clientEmail,
                        privateKey,
                    }),
                    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.firebasestorage.app`,
                }, "prepwise-admin");
            }
        } catch (e) {
            console.warn("Firebase Admin cert initialization error:", e);
        }
    } else {
        adminApp = getApps().length > 0 ? getApps()[0] : undefined;
    }




    if (adminApp) {
        try {
            adminAuth = getAuth(adminApp);
            adminDb = getFirestore(adminApp);
            adminStorage = getStorage(adminApp);
        } catch (e) {
            console.warn("Firebase Admin services initialization warning:", e);
        }
    }

    return {
        auth: adminAuth as Auth,
        db: adminDb as Firestore,
        storage: adminStorage as Storage,
    };
};

export const { auth, db, storage } = initFirebase();

