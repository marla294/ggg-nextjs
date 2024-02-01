import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const LocalStateContext = createContext({
  navOpen: false,
  setNavOpen: () => {},
  closeNav: () => {},
  openNav: () => {},
});

const LocalStateProvider = LocalStateContext.Provider;

const NavStateProvider = ({ children }: { children: any }) => {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  const closeNav = () => {
    setNavOpen(false);
  };

  const openNav = () => {
    setNavOpen(true);
  };

  useEffect(() => {
    closeNav();
  }, [router.pathname]);

  return (
    <LocalStateProvider value={{ navOpen, setNavOpen, closeNav, openNav }}>
      {children}
    </LocalStateProvider>
  );
};

const useNav = () => {
  return useContext(LocalStateContext);
};

export { NavStateProvider, useNav };
