
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('companion-list flex flex-col gap-6', classNames)}>
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl md:text-3xl tracking-tight">{title}</h2>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {companions?.length || 0} Sessions
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-white/5 backdrop-blur-sm">
                <Table>
                    <TableHeader className="bg-white/5 hover:bg-white/5 border-b border-white/10">
                        <TableRow className="border-b border-white/10 hover:bg-transparent">
                            <TableHead className="text-lg w-2/3 h-14 pl-6 text-muted-foreground/80 font-medium">Lessons</TableHead>
                            <TableHead className="text-lg text-muted-foreground/80 font-medium">Subject</TableHead>
                            <TableHead className="text-lg text-right pr-6 text-muted-foreground/80 font-medium">Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companions?.map(({ id, subject, name, topic, duration }) => (
                            <TableRow key={id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <TableCell className="pl-6 py-4">
                                    <Link href={`/companions/${id}`}>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="size-[64px] flex items-center justify-center rounded-2xl shadow-inner max-md:hidden transition-transform group-hover:scale-105"
                                                style={{ backgroundColor: getSubjectColor(subject) }}
                                            >
                                                <Image
                                                    src={`/icons/${subject}.svg`}
                                                    alt={subject}
                                                    width={32}
                                                    height={32}
                                                    className="opacity-90"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="font-bold text-xl group-hover:text-primary transition-colors">
                                                    {name}
                                                </p>
                                                <p className="text-sm text-muted-foreground font-medium">
                                                    {topic}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="subject-badge w-fit max-md:hidden">
                                        {subject}
                                    </div>
                                    <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                        <Image
                                            src={`/icons/${subject}.svg`}
                                            alt={subject}
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="pr-6">
                                    <div className="flex items-center gap-2 w-full justify-end font-medium text-lg">
                                        <p>
                                            {duration} {' '}
                                            <span className="max-md:hidden text-muted-foreground text-sm ml-1">mins</span>
                                        </p>
                                        <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden invert" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </article>
    )
}

export default CompanionList;