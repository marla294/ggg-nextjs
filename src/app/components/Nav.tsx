/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import Link from "next/link";
import styled from "styled-components";
import { useNav } from "../lib/navState";

const NavStyles = styled.div`
  position: fixed;
  top: 4.45rem;
  left: 0;
  display: none;
  background-color: white;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  z-index: 110;
  &.open {
    display: grid;
  }
`;

const InnerNavStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.1rem;

  a {
    padding: 1.5rem 2.5rem;
    border-bottom: 0.5px solid var(--lightGray);
    cursor: pointer;
  }
`;

export default function Nav({ signOut }: { signOut: any }) {
  const { navOpen, closeNav } = useNav();

  const clickHandler = () => {
    closeNav();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <NavStyles className={navOpen ? "open" : ""}>
      <InnerNavStyles>
        <Link href="/ingredients" legacyBehavior>
          <a onClick={clickHandler}>Ingredients</a>
        </Link>
        <Link href="/shoppingList" legacyBehavior>
          <a onClick={clickHandler}>Shopping List</a>
        </Link>
        <Link href="/recipes" legacyBehavior>
          <a onClick={clickHandler}>Recipes</a>
        </Link>
        <a onClick={handleSignOut}>Sign Out</a>
      </InnerNavStyles>
    </NavStyles>
  );
}
