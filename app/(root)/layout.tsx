import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const handleSignOut = async () => {
        'use server';
        await signOut();
        redirect('/sign-in');
    };

    return (
        <div className="root-layout">
            <nav className="flex justify-between items-center w-full px-4 py-3 bg-[#0d0e12] border-b border-white/10 mb-6">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={38}
                        height={32}
                    />
                    <h2 className="text-primary-100 font-bold text-xl">PrepWise</h2>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Image src="/user-avatar.png" alt="Avatar" width={24} height={24} className="rounded-full object-cover" />
                        <span className="text-xs text-gray-300 font-medium">{user.name}</span>
                    </div>

                    <form action={handleSignOut}>
                        <button type="submit" className="text-xs bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-all cursor-pointer">
                            Sign Out
                        </button>
                    </form>
                </div>
            </nav>

            <main className="w-full">
                {children}
            </main>
        </div>
    );
};

export default RootLayout;