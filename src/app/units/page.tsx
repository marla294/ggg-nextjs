"use client";
import getUnits from "./getUnits";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
// import StoreListItem from "../components/StoreListItem";

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

const AddUnitLinkText = styled.div`
  font-size: 1rem;
  color: var(--green);
  &:hover {
    text-decoration: underline;
  }
`;

export default function Units() {
  const [units, setUnits] = useState<any>(null);

  const fetchUnits = async () => {
    const res = await getUnits();
    const tempUnits = JSON.parse(res as string);
    setUnits(tempUnits);
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return (
    <div>
      <HeaderContainer>
        <h3>Units</h3>
        <Link href="units/add">
          <AddUnitLinkText>+ Add Unit</AddUnitLinkText>
        </Link>
      </HeaderContainer>

      <ListContainer>
        {units?.map((unit: any) => (
          <div>{unit?.name}</div>
          // <StoreListItem store={store} fetchStores={fetchStores} />
        ))}
      </ListContainer>
    </div>
  );
}
