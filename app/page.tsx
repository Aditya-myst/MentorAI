import React from 'react';
import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

export default async function Page() {
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions({ limit: 10 });

    const uniqueCompanions = companions.filter((companion, index, self) =>
        index === self.findIndex((c) => (
            c.id === companion.id || (c.name === companion.name && c.subject === companion.subject)
        ))
    );
    return (
        <main className="space-y-8 md:space-y-16 px-4 md:px-6 py-6 md:py-10 max-w-[1400px] mx-auto">
            <section className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Popular Companions</h1>
                    <p className="text-muted-foreground text-base md:text-lg">Choose a companion and start your learning journey.</p>
                </div>

                <div className="companions-grid">
                    {uniqueCompanions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))}
                </div>
            </section>

            <section className="flex flex-col xl:flex-row gap-8 items-start">
                <div className="w-full xl:w-2/3">
                    <CompanionList
                        title="Recently completed sessions"
                        companions={recentSessionsCompanions}
                    />
                </div>
                <div className="w-full xl:w-1/3 xl:sticky xl:top-24">
                    <CTA />
                </div>
            </section>
        </main>

    );
}
