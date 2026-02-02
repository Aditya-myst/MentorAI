import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const Cta = () => {
    return (
        <section className="cta-section group relative overflow-hidden bg-cta text-cta-foreground rounded-3xl p-10 flex flex-col items-center text-center gap-6 w-full shadow-2xl">
            {/* Decorative Background Icons */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-20">
                <div className="absolute -top-6 -right-6 rotate-12">
                    <Image src="/icons/maths.svg" alt="icon" width={160} height={160} className="w-40 h-40 grayscale opacity-40" />
                </div>
                <div className="absolute -bottom-6 -left-6 -rotate-12">
                    <Image src="/icons/science.svg" alt="icon" width={140} height={140} className="w-36 h-36 grayscale opacity-40" />
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rotate-45">
                    <Image src="/icons/coding.svg" alt="icon" width={100} height={100} className="w-24 h-24 grayscale opacity-30" />
                </div>
                {/* Additional icons to keep background rich */}
                <div className="absolute top-4 left-1/4 -rotate-12 opacity-30">
                    <Image src="/icons/history.svg" alt="icon" width={80} height={80} className="w-20 h-20 grayscale" />
                </div>
                <div className="absolute bottom-10 right-1/4 rotate-12 opacity-30">
                    <Image src="/icons/economics.svg" alt="icon" width={80} height={80} className="w-20 h-20 grayscale" />
                </div>
                <div className="absolute top-1/3 right-10 rotate-6 opacity-30">
                    <Image src="/icons/language.svg" alt="icon" width={80} height={80} className="w-20 h-20 grayscale" />
                </div>
            </div>

            <div className="cta-badge relative z-10 bg-black/5 text-cta-foreground/80 border border-cta-foreground/10 px-4 py-1.5 rounded-full text-sm font-semibold">
                Start learning your way
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight max-w-[15ch] text-balance relative z-10 text-cta-foreground tracking-tight">
                Build and Personalize Learning Companion
            </h2>

            <p className="text-cta-foreground/80 text-base max-w-lg leading-relaxed text-balance relative z-10 font-medium">
                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
            </p>

            <Link href="/companions/new" className="mt-4 relative z-10 transition-transform active:scale-95">
                <div
                    className="px-8 py-4 rounded-full font-bold text-white flex items-center gap-3 shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                    style={{
                        background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)'
                    }}
                >
                    <span>Build a New Companion</span>
                    <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
            </Link>
        </section>
    );
};

export default Cta;
