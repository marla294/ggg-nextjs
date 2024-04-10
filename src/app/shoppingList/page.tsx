"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BarContainer, ListContainer } from "../ingredients/page";
import getShoppingListItems from "./getShoppingListItems";
import ShoppingListItem from "../components/ShoppingListItem";
import deleteShoppingListItem from "./[id]/deleteShoppingListItem";
import { ThreeDots } from "react-loader-spinner";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";

const ClearButtonStyles = styled.button`
  width: 8rem;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--yellow);
  color: var(--darkYellow);
  border: 1px solid var(--darkYellow);
  &:hover {
    background: var(--darkYellow);
    color: white;
  }
`;

const ShoppingListBarStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0.5rem;
  font-size: 0.8rem;

  input,
  select {
    padding: 1rem;
    border: 1px solid black;
    font-size: 1.4rem;
    height: 4rem;
  }
`;

const SortByStyles = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(3.5rem, auto) 1fr;
  label {
    font-size: 1.2rem;
  }
`;

const GroupingContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const LoadingContainer = styled.div`
  height: 50vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

type SortOption = {
  display: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { display: "Alphabetical", value: "alphabetical" },
  { display: "Aisle", value: "aisle" },
  { display: "Home area", value: "homeArea" },
  { display: "Store", value: "store" },
];

export default function ShoppingList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sortBy, setSortBy] = useState<string>("alphabetical");
  const fetchShoppingListItems = async () => {
    const res = await getShoppingListItems({ sortBy });
    return JSON.parse(res as string);
  };
  const { data, error, isLoading } = useSWR(
    { sortBy },
    fetchShoppingListItems,
    { refreshInterval: 1000 }
  );
  const handleChange = (e: any) => {
    const val = e.target.value;
    setSortBy(val);
  };

  useEffect(() => {
    // const newQuery = new URLSearchParams(router.asPath.split("?")[1]);
    // newQuery.set("sortBy", sortBy);
    // router.push(`${router.pathname}?${newQuery.toString()}`);
    const params = new URLSearchParams((searchParams || "").toString());
    params.set("sortBy", sortBy);
    router.push(pathname + "?" + params.toString());
  }, [sortBy]);

  return (
    <>
      <BarContainer>
        <h3>Shopping List</h3>
        <ShoppingListBarStyles>
          <ClearButtonStyles
            type="button"
            onClick={async () => {
              if (
                confirm(
                  "Are you sure you want to clear the entire shopping list?"
                )
              ) {
                data?.forEach(async (grouping: any) => {
                  grouping[1]?.forEach(async (item: any) => {
                    await deleteShoppingListItem({
                      shoppingListItemId: item?._id,
                    });
                  });
                });
                await fetchShoppingListItems();
              }
            }}>
            Clear
          </ClearButtonStyles>
          <SortByStyles>
            <label htmlFor="sortBy">Sort:</label>
            <select
              name="sortBy"
              id="sortBy"
              value={sortBy}
              onChange={handleChange}>
              {sortOptions.map((option) => (
                <option
                  value={option.value}
                  id={option.value}
                  key={Math.random()}>
                  {option.display}
                </option>
              ))}
            </select>
          </SortByStyles>
        </ShoppingListBarStyles>
      </BarContainer>
      <ListContainer>
        {isLoading && (
          <LoadingContainer>
            <ThreeDots
              visible={true}
              height="13"
              width="40"
              color="gray"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{
                display: "grid",
                justifyItems: "center",
              }}
              wrapperClass=""
            />
          </LoadingContainer>
        )}
        {data?.map((grouping: any) => {
          return (
            <div key={grouping[0]}>
              <h3>{grouping[0]}</h3>
              <GroupingContainer>
                {grouping[1]?.map((shoppingListItem: any) => {
                  const { ingredient } = shoppingListItem;
                  return (
                    <ShoppingListItem
                      key={ingredient._id}
                      ingredient={ingredient}
                      quantity={shoppingListItem?.quantity}
                      shoppingListItemId={shoppingListItem?._id}
                    />
                  );
                })}
              </GroupingContainer>
            </div>
          );
        })}
      </ListContainer>
    </>
  );
}
