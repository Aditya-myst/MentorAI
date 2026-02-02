import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

const CompanionCard = ({
    id,
    name,
    topic,
    subject,
    duration,
    color,
}: CompanionCardProps) => {
    return (
        <article
            className="companion-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between gap-6 w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-white/10"
        >
            {/* Ambient Background Glow */}
            <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                style={{ backgroundColor: color }}
            />

            {/* Decorative Overlay for texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start">
                <span className="subject-badge bg-white/5 border-white/10 backdrop-blur-md text-foreground/80">
                    {subject}
                </span>
                <button className="companion-bookmark">
                    <Image
                        src="/icons/bookmark.svg"
                        alt="Bookmark"
                        width={14}
                        height={16}
                        className="opacity-50 hover:opacity-100 transition-opacity invert dark:invert-0"
                    />
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3 mt-4 flex-grow">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">{name}</h2>
                <p className="text-sm font-medium text-muted-foreground line-clamp-2">{topic}</p>

                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/80 mt-auto pt-4">
                    <Image
                        src="/icons/clock.svg"
                        alt="Time"
                        width={16}
                        height={16}
                        className="opacity-60 invert dark:invert-0"
                    />
                    <span>{duration} min session</span>
                </div>
            </div>

            {/* Action */}
            <div className="relative z-10 pt-4 mt-auto">
                <Link href={`/companions/${id}`} className="block w-full">
                    <div
                        className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] shadow-lg"
                        style={{
                            backgroundColor: color,
                            color: '#ffffff', // Ensure text is legible on color
                            boxShadow: `0 8px 20px -8px ${color}80`
                        }}
                    >
                        Launch Lesson
                    </div>
                </Link>
            </div>
        </article>
    );
};
export default CompanionCard;
