'use client'

import { Select } from '@radix-ui/react-select';
import React, { useEffect } from 'react';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { removeKeysFromUrlQuery, formUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = React.useState(query);

    useEffect(() => {
        let newUrl = "";

        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
        }

        router.push(newUrl, { scroll: false });
    }, [subject, router, searchParams]);

    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="w-[180px] h-auto py-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-foreground transition-all hover:bg-white/10 hover:border-white/20 focus:ring-1 focus:ring-white/20 outline-none capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;
