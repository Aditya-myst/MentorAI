import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={72}
                        height={48}
                    />
                </div>
            </Link>
            <div className="flex items-center gap-8">
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
                                userButtonAvatarBox: "w-14 h-14"
                            }
                        }}
                    />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;