"use client";
import getHomeAreas from "./getHomeAreas";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import HomeAreaListItem from "../components/HomeAreaListItem";

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

const AddHomeAreaLinkText = styled.div`
  font-size: 1rem;
  color: var(--green);
  &:hover {
    text-decoration: underline;
  }
`;

export default function HomeArea() {
  const [homeAreas, setHomeAreas] = useState<any>(null);

  const fetchHomeAreas = async () => {
    const res = await getHomeAreas();
    const tempHomeAreas = JSON.parse(res as string);
    setHomeAreas(tempHomeAreas);
  };

  useEffect(() => {
    fetchHomeAreas();
  }, []);

  return (
    <div>
      <HeaderContainer>
        <h3>Home Areas</h3>
        <Link href="homeAreas/add">
          <AddHomeAreaLinkText>+ Add Home Area</AddHomeAreaLinkText>
        </Link>
      </HeaderContainer>

      <ListContainer>
        {homeAreas?.map((homeArea: any) => (
          <HomeAreaListItem
            homeArea={homeArea}
            fetchHomeAreas={fetchHomeAreas}
          />
        ))}
      </ListContainer>
    </div>
  );
}
