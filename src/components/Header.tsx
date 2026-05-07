"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Home", num: "00" },
  { href: "/about", label: "About", num: "01" },
  { href: "/projects", label: "Projects", num: "02" },
  { href: "/hackathons", label: "NEBULA:FOG", num: "03" },
  { href: "/talks", label: "Talks", num: "04" },
  { href: "/blog", label: "Writing", num: "05" },
  { href: "/contact", label: "Contact", num: "06" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              R.Ragan
            </span>
            <span className="hidden sm:inline text-fg-muted font-mono text-[10px] tracking-wider">
              // theoradical.ai
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "px-3 py-1.5 rounded text-sm transition-colors",
                    active
                      ? "text-accent font-medium"
                      : "text-fg-muted hover:text-fg"
                  )}
                >
                  <span className="font-mono text-[10px] mr-1 opacity-50">
                    {item.num}
                  </span>
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={toggle}
              className="ml-2 p-2 rounded-lg text-fg-muted hover:text-fg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 text-fg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-fg-muted"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-border mt-2 pt-3">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "block px-3 py-2 rounded text-sm transition-colors",
                    active
                      ? "text-accent font-medium bg-accent/5"
                      : "text-fg-muted"
                  )}
                >
                  <span className="font-mono text-[10px] mr-2 opacity-50">
                    {item.num}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
