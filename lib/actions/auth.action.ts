'use server';
import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        await db.collection('users').doc(uid).set({
            name: name,
            email: email,
            createdAt: new Date().toISOString()
        });

        return {
            success: true,
            message: 'User profile created successfully'
        };

    } catch (e: any) {
        console.error('Error creating a user in Firestore Admin:', e);
        return {
            success: false,
            message: e.message || 'Something went wrong during database registration'
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: 'User does not exist. Create an account instead'
            };
        }

        const cookieResult = await setSessionCookie(idToken);
        if (!cookieResult.success) {
            return {
                success: false,
                message: 'Failed to create a secure login session.'
            };
        }

        return {
            success: true,
            message: 'Signed in successfully'
        };
    }
    catch (e: any) {
        console.error('Error logging into account via Admin:', e);
        return {
            success: false,
            message: 'Failed to log into an account. Check server logs.'
        };
    }
}

export async function setSessionCookie(idToken: string) {
    try {
        const cookieStore = await cookies();

        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn: ONE_WEEK * 1000,
        });

        cookieStore.set("session", sessionCookie, {
            maxAge: ONE_WEEK,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return { success: true };
    } catch (cookieError) {
        console.error("Session Cookie Error:", cookieError);
        return { success: false };
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        // FIX 1: Access unique ID via '.uid' instead of '.id'
        if (!decodedClaims || !decodedClaims.uid) return null;

        const userSnapshot = await db.collection('users')
            .doc(decodedClaims.uid)
            .get();

        // FIX 2: Check snapshot existence properly using '.exists'
        if (!userSnapshot.exists) return null;

        return {
            ...userSnapshot.data(),
            id: userSnapshot.id,
        } as User;

    } catch (e) {
        // FIX 3: Safe string wrapper logging to prevent source-map parser crashes
        console.error("Authentication Core Crash Error Log:", e instanceof Error ? e.message : String(e));
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}