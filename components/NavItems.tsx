'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' },
]

interface NavItemsProps {
    onClose?: () => void;
    className?: string;
}

const NavItems = ({ onClose, className }: NavItemsProps) => {
    const pathname = usePathname();
    return (
        <nav className={cn("flex items-center gap-8", className)}>
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={href}
                    onClick={onClose}
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
