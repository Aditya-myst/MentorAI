import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
    getUserCompanions,
    getUserSessions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionList";

const Profile = async () => {
    const user = await currentUser();

    if (!user) redirect("/sign-in");

    const companionsRaw = await getUserCompanions(user.id);
    const sessionHistoryRaw = await getUserSessions(user.id);
    // const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

    // Deduplicate companions
    const companions = companionsRaw.filter((companion, index, self) =>
        index === self.findIndex((c) => (
            c.id === companion.id || (c.name === companion.name && c.subject === companion.subject)
        ))
    );

    // Deduplicate session history to show unique recently visited companions
    const sessionHistory = sessionHistoryRaw.filter((companion, index, self) =>
        index === self.findIndex((c) => (
            c.id === companion.id
        ))
    );

    return (
        <main className="max-w-[1400px] mx-auto px-6 py-10 space-y-12">
            {/* Header / Stats Section */}
            <section className="glass-panel rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between shadow-2xl">
                <div className="flex gap-6 items-center w-full md:w-auto">
                    <div className="relative size-24 md:size-32 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                        <Image
                            src={user.imageUrl}
                            alt={user.firstName!}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-3xl md:text-4xl tracking-tight">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            {user.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="flex-1 md:flex-none border border-white/10 bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-center min-w-[140px] gap-2">
                        <div className="size-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <Image
                                src="/icons/check.svg"
                                alt="checkmark"
                                width={24}
                                height={24}
                                className="invert"
                            />
                        </div>
                        <p className="text-3xl font-bold">{sessionHistory.length}</p>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Lessons</p>
                    </div>
                    <div className="flex-1 md:flex-none border border-white/10 bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-center min-w-[140px] gap-2">
                        <div className="size-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                            <Image src="/icons/cap.svg" alt="cap" width={28} height={28} className="invert" />
                        </div>
                        <p className="text-3xl font-bold">{companions.length}</p>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Companions</p>
                    </div>
                </div>
            </section>

            <Accordion type="multiple" defaultValue={['recent', 'companions']} className="space-y-6">
                <AccordionItem value="recent" className="border-none">
                    <AccordionTrigger className="text-2xl font-bold hover:no-underline px-2">
                        Recent Sessions
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <CompanionsList
                            title="Recent Sessions"
                            companions={sessionHistory}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="companions" className="border-none">
                    <AccordionTrigger className="text-2xl font-bold hover:no-underline px-2">
                        My Companions {`(${companions.length})`}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <CompanionsList title="My Companions" companions={companions} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
};
export default Profile;