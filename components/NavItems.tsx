'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: 'my-journey' },
]


const NavItems = () => {
    const pathname = usePathname();
    return (
        <nav className="flex items-center gap-8">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={href}
                    className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default NavItems;