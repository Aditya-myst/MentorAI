import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    if (!user) redirect("/sign-in");
    if (!companion?.name) redirect("/companions");

    const { name, subject, topic } = companion;

    return (
        <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
            <article className="glass-panel rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div
                        className="size-24 md:size-32 flex items-center justify-center rounded-2xl shadow-lg"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        <Image
                            src={`/icons/${subject}.svg`}
                            alt={subject}
                            width={48}
                            height={48}
                            className="opacity-90"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <h1 className="font-bold text-3xl md:text-5xl tracking-tight">{name}</h1>
                            <div className="subject-badge max-md:hidden px-3 py-1 text-sm">{subject}</div>
                        </div>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium">{topic}</p>
                        <div className="subject-badge md:hidden w-fit mt-1">{subject}</div>
                    </div>
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName ?? "Guest"}
                userImage={user.imageUrl ?? "/default-user.png"}
            />
        </main>
    );
};

export default CompanionSession;
