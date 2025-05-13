"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import useScrollDirection from "@/hooks/ScrollDirection/useScrollDirection";
import { useState } from "react";
import Button from "./Buttons/Button";
import { usePathname } from "next/navigation";

export function NavbarDemo() {

  const pathName = usePathname();
  
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Skills",
      link: "/skills",
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "Contact Me",
      link: "/contact",
    },

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isVisible = useScrollDirection();

  if(!pathName.includes("dashboard")){
    
      return (
        <nav className={`fixed top-0 w-full transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-20"}`}>
                  <div className="relative w-full">
          <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} />
              <div className="flex items-center gap-4">
                <Button text={"Hire"}></Button>
              </div>
            </NavBody>
    
            {/* Mobile Navigation */}
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </MobileNavHeader>
    
              <MobileNavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              >
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Book a call
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
    
          {/* Navbar */}
        </div>
        </nav>
    
      );

  }
}

