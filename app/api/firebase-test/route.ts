import { db, auth, storage } from "@/firebase/admin";
import { db as clientDb } from "@/firebase/client";

export const dynamic = 'force-dynamic';


export async function GET() {
    const results: Record<string, any> = {
        timestamp: new Date().toISOString(),
        environment: {
            hasNextPublicFirebaseApiKey: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
            hasNextPublicFirebaseProjectId: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
            hasAdminProjectId: Boolean(process.env.FIREBASE_PROJECT_ID),
            hasAdminClientEmail: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
            hasAdminPrivateKey: Boolean(process.env.FIREBASE_PRIVATE_KEY),
        },
        services: {
            firestoreAdmin: false,
            firebaseStorageAdmin: false,
            firebaseAuthAdmin: false,
        },
        mode: "Unknown",
        details: {}
    };

    // 1. Check Admin Auth
    if (auth) {
        results.services.firebaseAuthAdmin = true;
    }

    // 2. Check Admin Storage
    if (storage) {
        try {
            const bucket = storage.bucket();
            results.services.firebaseStorageAdmin = true;
            results.details.storageBucketName = bucket.name;
        } catch (e: any) {
            results.details.storageError = e?.message || String(e);
        }
    }

    // 3. Check Firestore Admin Database read/write
    if (db) {
        try {
            const testRef = db.collection("_healthcheck").doc("status");
            await testRef.set({
                lastChecked: new Date().toISOString(),
                status: "ok"
            });
            const snap = await testRef.get();
            if (snap.exists) {
                results.services.firestoreAdmin = true;
                results.details.firestorePing = snap.data();
            }
        } catch (dbErr: any) {
            results.details.firestoreError = dbErr?.message || String(dbErr);
        }
    }

    const isFullyConfigured = results.environment.hasAdminProjectId &&
                              results.environment.hasAdminClientEmail &&
                              results.environment.hasAdminPrivateKey &&
                              results.services.firestoreAdmin;

    results.mode = isFullyConfigured ? "🔥 Connected to Live Firebase Project" : "⚡ Operating in Local Demo / Standalone Mode (Missing Firebase Service Account Keys in .env.local)";

    return Response.json(results, { status: 200 });
}
