'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';
    const [searchQuery, setSearchQuery] = useState(query);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['topic'],
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div className="relative border border-white/10 bg-white/5 rounded-full items-center flex gap-3 px-4 py-2 h-fit transition-all hover:border-white/20 hover:bg-white/10 group">
            <Search
                className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-foreground"
            />
            <input
                placeholder="Search Companions..."
                className="outline-none bg-transparent text-sm w-[200px] placeholder:text-muted-foreground text-foreground transition-all focus:w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
