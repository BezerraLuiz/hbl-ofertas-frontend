"use client";

import { usePathname } from "next/navigation";
import { WppIcon } from './style';

export default function WppContact() {
    const pathname = usePathname();

    const href = pathname == "/" ? "https://wa.link/1ok330" : "https://wa.link/c29dap";

    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <WppIcon src="/wpp.svg" alt="wpp-icon" />
        </a>
    );
}
