"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import getAisles from "./getAisles";
// import HomeAreaListItem from "../components/HomeAreaListItem";

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

const AddAisleLinkText = styled.div`
  font-size: 1rem;
  color: var(--green);
  &:hover {
    text-decoration: underline;
  }
`;

export default function Aisles() {
  const [aisles, setAisles] = useState<any>(null);

  const fetchAisles = async () => {
    const res = await getAisles();
    const tempAisles = JSON.parse(res as string);
    setAisles(tempAisles);
  };

  useEffect(() => {
    fetchAisles();
  }, []);

  return (
    <div>
      <HeaderContainer>
        <h3>Aisles</h3>
        <Link href="aisles/add">
          <AddAisleLinkText>+ Add Aisle</AddAisleLinkText>
        </Link>
      </HeaderContainer>

      <ListContainer>
        {aisles?.map((aisle: any) => (
          <div>{aisle?.name}</div>
          // <HomeAreaListItem
          //   homeArea={homeArea}
          //   fetchHomeAreas={fetchHomeAreas}
          // />
        ))}
      </ListContainer>
    </div>
  );
}
