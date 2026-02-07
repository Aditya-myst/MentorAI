"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import NavItems from "@/components/NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={72}
                        height={48}
                        className="w-14 h-auto md:w-[72px]"
                    />
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton >
                        <button className="glass-button px-6 py-2 rounded-full text-base font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95 text-foreground border-white/10 shadow-lg shadow-black/5">
                            <span className="relative z-10">Sign In</span>
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-12 h-12 md:w-14 md:h-14"
                            }
                        }}
                    />
                </SignedIn>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex md:hidden items-center gap-4">
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-10 h-10"
                            }
                        }}
                    />
                </SignedIn>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-foreground hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-4 mx-4 p-6 glass-menu rounded-3xl flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <NavItems className="flex-col items-start gap-4" onClose={() => setIsMenuOpen(false)} />
                    <SignedOut>
                        <SignInButton >
                            <button className="glass-button w-full px-6 py-3 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 text-foreground border-white/10 shadow-lg shadow-black/5">
                                <span className="relative z-10">Sign In</span>
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
