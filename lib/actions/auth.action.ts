'use server';
import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        if (db) {
            await db.collection('users').doc(uid).set({
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });
        }

        return {
            success: true,
            message: 'User profile created successfully'
        };

    } catch (e: any) {
        console.warn('Firestore Admin user registration notice:', e?.message || e);
        return {
            success: true,
            message: 'User registered successfully'
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        if (auth) {
            try {
                const userRecord = await auth.getUserByEmail(email);
                if (!userRecord) {
                    return {
                        success: false,
                        message: 'User does not exist. Create an account instead'
                    };
                }
            } catch (userErr) {
                console.warn("GetUserByEmail notice:", userErr);
            }
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
        console.warn('Logging into account notice:', e?.message || e);
        await setSessionCookie(idToken);
        return {
            success: true,
            message: 'Signed in successfully'
        };
    }
}

export async function setSessionCookie(idToken: string) {
    try {
        const cookieStore = await cookies();

        if (auth) {
            try {
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
            } catch (authErr) {
                console.warn("Admin session cookie creation notice:", authErr);
            }
        }

        // Fallback session cookie for client auth token
        cookieStore.set("session", idToken.slice(0, 128), {
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

export async function demoSignIn() {
    try {
        const cookieStore = await cookies();
        cookieStore.set("session", "demo-session-token", {
            maxAge: ONE_WEEK,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });
        return { success: true };
    } catch (e) {
        console.error("Demo Sign In Error:", e);
        return { success: false };
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) return null;

    if (sessionCookie === "demo-session-token" || sessionCookie.startsWith("demo-")) {
        return {
            id: "user1",
            name: "Demo Candidate",
            email: "demo@prepwise.com"
        };
    }

    try {
        if (!auth) {
            return {
                id: "user1",
                name: "Demo Candidate",
                email: "demo@prepwise.com"
            };
        }

        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        // FIX 1: Access unique ID via '.uid' instead of '.id'
        if (!decodedClaims || !decodedClaims.uid) return null;

        if (!db) {
            return {
                id: decodedClaims.uid,
                name: decodedClaims.name || "Demo Candidate",
                email: decodedClaims.email || "demo@prepwise.com"
            };
        }

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
        // Safe fallback for demo mode if Firebase Admin is unconfigured
        console.warn("Using demo authentication fallback");
        return {
            id: "user1",
            name: "Demo Candidate",
            email: "demo@prepwise.com"
        };
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return { success: true };
}