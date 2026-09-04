"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbtns from "./NavBtns";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";
import Cross from "@/icons/Cross";
import Menu from "@/icons/Menu";
import Logo from "../Logo";
import { mainHomeNavItems } from "@/data/navbar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = mainHomeNavItems;

  const handleLinkClick = (item) => {
    setMobileMenuOpen(false);
    if (!item?.target) return;

    if (item.target.startsWith("#")) {
      const element = document.querySelector(item.target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/" + item.target);
      }
    } else {
      router.push(item.target);
    }
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#contact");
    }
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-100">
        <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="shrink-0 flex items-center"
          >
            <Logo variant="lg" />
          </Link>

          {/* DESKTOP & LARGE SCREENS (>= lg): Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-3">
            {navItems.map((item) => (
              <Navbtns
                key={item.label}
                text={item.label}
                isActive={false}
                onClick={() => handleLinkClick(item)}
              />
            ))}
          </div>

          {/* DESKTOP & LARGE SCREENS (>= lg): Contact Button */}
          <div className="hidden lg:block shrink-0">
            <Button variant="primary" size="md" onClick={handleContactClick}>
              Contact Us
            </Button>
          </div>

          {/* MOBILE & TABLETS (< lg): Hamburger Button */}
          <Button
            variant="ghost"
            size="none"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-neutral-800"
          >
            {mobileMenuOpen ? (
              <Cross className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </Button>
        </nav>
      </header>

      {/* MOBILE & TABLET NAV COMPONENT */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        handleLinkClick={handleLinkClick}
      />
    </>
  );
};

export default Navbar;
