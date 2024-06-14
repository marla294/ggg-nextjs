"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
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

const ListBarStyles = styled.div`
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

const CenteredContainer = styled.div`
  height: 50vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const BarContainer = styled.div`
  position: fixed;
  top: 4.45rem;
  left: 0;
  background-color: white !important;
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;
`;

const ListContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-top: 7rem;
`;

type SortOption = {
  display: string;
  value: string;
};

enum Sort {
  alphabetical = "alphabetical",
  aisle = "aisle",
  homeArea = "homeArea",
  store = "store",
}

const sortOptions: SortOption[] = [
  { display: "Alphabetical", value: Sort.alphabetical },
  { display: "Aisle", value: Sort.aisle },
  { display: "Home area", value: Sort.homeArea },
  { display: "Store", value: Sort.store },
];

export default function ShoppingList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sortBy, setSortBy] = useState<any>(Sort.alphabetical);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchShoppingListItems = async () => {
    setIsLoading(true);
    const res = await getShoppingListItems({ sortBy });
    setData(JSON.parse(res as string));
    setIsLoading(false);
  };

  // const { data, error, isLoading } = useSWR(
  //   { sortBy },
  //   fetchShoppingListItems,
  //   { refreshInterval: 1000 }
  // );

  const handleChange = (e: any) => {
    const val = e.target.value;
    const sort = (Sort as any)[val];
    setSortBy(sort);
  };

  useEffect(() => {
    const params = new URLSearchParams((searchParams || "").toString());
    if (params.get("sortBy")) {
      setSortBy(params.get("sortBy") || Sort.alphabetical);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams((searchParams || "").toString());
    if (sortBy) {
      params.set("sortBy", sortBy);
      router.push(pathname + "?" + params.toString());
      fetchShoppingListItems();
    }
  }, [sortBy]);

  return (
    <>
      <BarContainer>
        <h3>Shopping List</h3>
        <ListBarStyles>
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
                  key={option.value}>
                  {option.display}
                </option>
              ))}
            </select>
          </SortByStyles>
        </ListBarStyles>
      </BarContainer>
      <ListContainer>
        {isLoading && (
          <CenteredContainer>
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
          </CenteredContainer>
        )}
        {/* {error && <CenteredContainer>An error has occurred</CenteredContainer>} */}
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
                      fetchShoppingListItems={fetchShoppingListItems}
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
