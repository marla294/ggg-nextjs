"use client";
import { useEffect, useState } from "react";
import getUser from "./getUser";
import styled from "styled-components";

const Line = styled.div`
  display: grid;
  width: 400px;
  grid-template-columns: 1fr 5fr;
`;

export default function Page() {
  const [user, setUser] = useState<any>();

  const fetchUser = async () => {
    const res = await getUser();
    const tempUser = JSON.parse(res || "");
    setUser(tempUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>
      <Line>
        <h4>Name: </h4>
        <span>{user?.name}</span>
      </Line>
      <Line>
        <h4>Email: </h4>
        <span>{user?.email}</span>
      </Line>
    </div>
  );
}
