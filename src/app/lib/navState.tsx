"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const LocalStateContext = createContext({
  navOpen: false,
  setNavOpen: () => {},
  closeNav: () => {},
  openNav: () => {},
  toggleNav: () => {},
});

const LocalStateProvider = LocalStateContext.Provider;

const NavStateProvider = ({ children }: { children: any }) => {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  const closeNav = () => {
    setNavOpen(false);
  };

  const openNav = () => {
    setNavOpen(true);
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    closeNav();
  }, [pathname]);

  return (
    <LocalStateProvider
      value={{ navOpen, setNavOpen, closeNav, openNav, toggleNav }}>
      {children}
    </LocalStateProvider>
  );
};

const useNav = () => {
  return useContext(LocalStateContext);
};

export { NavStateProvider, useNav };
