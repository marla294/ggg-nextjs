"use client";
import styled from "styled-components";
import Link from "next/link";
import Nav from "./Nav";
import { useNav } from "../lib/navState";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const Logo = styled.h1`
  font-size: 2rem;
  background: #ff5733;
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: white;
  display: grid;
  grid-template-columns: minmax(200px, auto) 1fr;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5rem solid var(--purple);
  z-index: 1;
`;

const NavStyles = styled.nav`
  display: flex;
  justify-self: end;
  align-items: center;
  height: 100%;
  font-size: 1rem;

  .signedInLinks {
    grid-template-columns: repeat(4, auto);
    white-space: nowrap;
  }

  .signedOutLinks {
    grid-template-columns: repeat(1, auto);
  }

  .mobile-nav-button {
    display: block;
    height: 1.3rem;
    width: 1.6rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 2rem;
  }

  .mobile-nav-button .line {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 5px;
    background: var(--purple);
    transition: transform 0.2s ease-in-out;
  }

  .mobile-nav-button .line1 {
    transform-origin: 0% 0%;
    transition: transform 0.2s ease-in-out;
  }

  .mobile-nav-button .line2 {
    transition: transform 0.2s ease-in-out;
  }

  .mobile-nav-button .line3 {
    transform-origin: 0% 100%;
    transition: transform 0.2s ease-in-out;
  }

  .open .line1 {
    transform: rotate(45deg);
  }
  .open .line2 {
    transform: scaleY(0);
  }
  .open .line3 {
    transform: rotate(-45deg);
  }
`;

const Container = styled.div`
  padding: 6rem 1rem 0 1rem;
`;

export default function Header({
  children,
  signOut,
}: {
  children: React.ReactNode;
  signOut: any;
}) {
  const { navOpen, toggleNav } = useNav();
  const router = useRouter();
  const closeButtonRef = useRef<any>(null);

  const handleSignout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <>
      <HeaderStyles>
        <Logo>
          <Link href="/shoppingList">Go Get Ur Groceries</Link>
        </Logo>
        <NavStyles>
          <div
            className={navOpen ? "mobile-nav-button open" : "mobile-nav-button"}
            onClick={toggleNav}
            ref={closeButtonRef}>
            <span className="line line1" />
            <span className="line line2" />
            <span className="line line3" />
          </div>
        </NavStyles>
      </HeaderStyles>
      <Nav signOut={handleSignout} closeButtonRef={closeButtonRef} />
      <Container>{children}</Container>
    </>
  );
}
