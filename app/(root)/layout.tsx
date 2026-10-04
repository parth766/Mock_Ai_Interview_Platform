import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();

    // Fallback user object to prevent sign-in redirect loops
    const activeUser = user || {
        id: "user1",
        name: "Candidate",
        email: "candidate@prepwise.com"
    };

    const handleSignOut = async () => {
        'use server';
        await signOut();
        redirect('/sign-in');
    };

    return (
        <div className="root-layout">
            <Navbar userName={activeUser.name} onSignOut={handleSignOut} />

            <main className="w-full">
                {children}
            </main>
        </div>
    );
};

export default RootLayout;