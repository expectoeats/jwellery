"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className="flex items-center gap-1.5 py-4 overflow-x-auto">
      <Link href="/" className="text-[11px] font-sans text-[#6b5e54] hover:text-[#c5a47e] transition-colors whitespace-nowrap">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <FiChevronRight className="text-[10px] text-[#e5dfd8]" />
          {item.href ? (
            <Link href={item.href} className="text-[11px] font-sans text-[#6b5e54] hover:text-[#c5a47e] transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-[11px] font-sans text-[#2c2420] font-medium whitespace-nowrap">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
