import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SubjectFilter from "@/components/SubjectFilter";
import SearchInput from "@/components/Searchinginput";

interface SearchParams {
    searchParams: Promise<{ subject?: string; topic?: string }>;
}

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const params = await searchParams;
    const subject = params.subject || '';
    const topic = params.topic || '';

    const companions = await getAllCompanions({ subject, topic });

    // Deduplicate companions by ID and Name to prevent duplicate cards
    const uniqueCompanions = companions.filter((companion, index, self) =>
        index === self.findIndex((c) => (
            c.id === companion.id || (c.name === companion.name && c.subject === companion.subject)
        ))
    );

    return (
        <main className="px-6 py-8 space-y-6">
            {/* Header & Filters */}
            <section className="flex flex-wrap justify-between gap-4 items-center">
                <h1 className="text-3xl font-bold text-foreground">Companion Library</h1>
                <div className="flex gap-3 flex-wrap">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>

            {/* Companions Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {uniqueCompanions.length > 0 ? (
                    uniqueCompanions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))
                ) : (
                    <p className="text-muted-foreground col-span-full">
                        No companions found for the selected filters.
                    </p>
                )}
            </section>
        </main>
    );
};

export default CompanionsLibrary;
