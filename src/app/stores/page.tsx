"use client";
import getStores from "./getStores";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import StoreListItem from "../components/StoreListItem";

const ListContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-top: 4rem;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 280px;
  align-items: center;
`;

const AddStoreLinkText = styled.div`
  font-size: 1rem;
  color: var(--green);
  &:hover {
    text-decoration: underline;
  }
`;

export default function Store() {
  const [stores, setStores] = useState<any>(null);

  const fetchStores = async () => {
    const res = await getStores();
    const tempStores = JSON.parse(res as string);
    setStores(tempStores);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div>
      <HeaderContainer>
        <h3>Stores</h3>
        <Link href="stores/add">
          <AddStoreLinkText>+ Add Store</AddStoreLinkText>
        </Link>
      </HeaderContainer>

      <ListContainer>
        {stores?.map((store: any) => (
          <StoreListItem store={store} fetchStores={fetchStores} />
        ))}
      </ListContainer>
    </div>
  );
}
