"use client";
import { useEffect, useState } from "react";
import getUser from "./getUser";

export default function Page() {
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const res = await getUser();
    // const tempRecipeItems = JSON.parse(res);
    // setRecipeItems(tempRecipeItems);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>Profile</>;
}
