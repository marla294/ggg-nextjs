"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getShoppingListItems from "../getShoppingListItems";
import editShoppingListItem from "./editShoppingListItem";
import useForm from "../../lib/useForm";
import DeleteFromShoppingListButton from "../../components/DeleteFromShoppingListButton";
import EditIngredientButton from "../../components/EditIngredientButton";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";

const SingleItemStyles = styled.div`
  padding: 0 10%;

  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
  .noPhoto {
    width: 100%;
    height: 300px;
    display: grid;
    align-content: center;
    justify-content: center;
    border: 1px dashed var(--black);
  }

  @media (min-width: 768px) {
    padding: 0;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    align-items: top;
    grid-gap: 5rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
`;

const EditButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const AmountContainer = styled.div`
  display: grid;
  grid-template-columns: 170px auto;
  grid-gap: 10px;
  width: 300px;
`;

const EditInput = styled.input`
  width: 50px;
  font-size: 1rem;
`;

const EditAmountButton = styled.button`
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.5rem 1rem;
  background: var(--green);
  color: black;
  border: 1px solid var(--darkGreen);
`;

const SubmitAmountButton = styled.button`
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.5rem 1rem;
  background: var(--green);
  color: black;
  border: 1px solid var(--darkGreen);
`;

const CancelEditAmountButton = styled.button`
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.5rem 1rem;
  background: var(--orange);
  color: var(--darkOrange);
  border: 1px solid var(--darkOrange);
`;

const RecipeContainer = styled.div`
  margin-bottom: 5px;
`;

export default function Page({ params }: { params: { id: string } }) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState<any>({});
  const { handleChange, inputs, setInputs } = useForm({});
  const searchParams = useSearchParams();
  const sortBy = searchParams?.get("sortBy");

  const fetchShoppingListItems = async () => {
    let filterShoppingListItems: any;
    if (sortBy === "recipe") {
      filterShoppingListItems = { id: params.id };
    } else {
      filterShoppingListItems = { ingredientId: params.id };
    }

    const res = await getShoppingListItems(filterShoppingListItems);
    const tempShoppingListItems = JSON.parse(res as string);

    let items = {};

    tempShoppingListItems.forEach((item: any) => {
      items = { ...items, [`quantity_${item._id}`]: item.quantity / 10 };
    });

    setInputs({ ...inputs, ...items });

    return tempShoppingListItems;
  };

  const addRecipeToShoppingListMutation = useMutation({
    mutationFn: async (vars: {
      shoppingListItemId: string;
      quantity: number;
    }) => {
      await editShoppingListItem({
        id: vars?.shoppingListItemId,
        quantity: vars?.quantity,
      });
    },
    onSuccess: () => {
      // TODO: Invalidate queries
      // queryClient.invalidateQueries({ queryKey: ["recipeQuery"] });
    },
  });

  const { data: shoppingListItems, isLoading } = useQuery({
    queryKey: ["shoppingListItem"],
    queryFn: fetchShoppingListItems,
  });

  useEffect(() => {
    if (
      shoppingListItems?.length &&
      shoppingListItems[0]?.ingredient?.photo?.image?._meta?.url
    ) {
      setImageUrl(shoppingListItems[0]?.ingredient?.photo?.image?._meta?.url);
    }
    if (
      shoppingListItems?.length &&
      shoppingListItems[0]?.ingredient?.photo?.imageUrl
    ) {
      setImageUrl(shoppingListItems[0]?.ingredient?.photo?.imageUrl);
    }
  }, [shoppingListItems]);

  // TODO: If shopping list item doesn't exist, show them a message
  return (
    <div>
      {isLoading && (
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
      )}
      {!isLoading && (
        <SingleItemStyles>
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={
                  shoppingListItems[0]?.ingredient?.photo?.altText ||
                  shoppingListItems[0]?.ingredient?.name
                }
              />
            ) : (
              <div className="noPhoto">Needs photo 📸</div>
            )}
          </div>
          <div>
            <h3>
              {shoppingListItems?.length &&
                shoppingListItems[0]?.ingredient?.name}
            </h3>
            {shoppingListItems?.length &&
              shoppingListItems?.map((item: any) => (
                <RecipeContainer key={item?._id}>
                  <div>{item?.recipe?.name}</div>
                  <AmountContainer>
                    <h4>
                      Amount:{" "}
                      {isEditing[item._id] ? (
                        <EditInput
                          required
                          type="text"
                          id={`quantity_${item._id}`}
                          name={`quantity_${item._id}`}
                          placeholder="Quantity"
                          value={inputs[`quantity_${item._id}`]}
                          onChange={handleChange}
                        />
                      ) : inputs[`quantity_${item._id}`] ? (
                        inputs[`quantity_${item._id}`]
                      ) : (
                        0
                      )}{" "}
                      {shoppingListItems[0]?.ingredient?.units === "none"
                        ? ""
                        : shoppingListItems[0]?.ingredient?.units}{" "}
                    </h4>
                    {!isEditing[item._id] && (
                      <EditAmountButton
                        onClick={() => {
                          setIsEditing({ ...isEditing, [item._id]: true });
                        }}>
                        Edit Amount
                      </EditAmountButton>
                    )}
                    {isEditing[item._id] && (
                      <EditButtonContainer>
                        <SubmitAmountButton
                          onClick={() => {
                            addRecipeToShoppingListMutation.mutate({
                              shoppingListItemId: item?._id || "",
                              quantity: inputs[`quantity_${item._id}`] || 0,
                            });
                            setIsEditing({ ...isEditing, [item._id]: false });
                          }}>
                          Submit
                        </SubmitAmountButton>
                        <CancelEditAmountButton
                          onClick={() => {
                            setIsEditing({ ...isEditing, [item._id]: false });
                          }}>
                          &times;
                        </CancelEditAmountButton>
                      </EditButtonContainer>
                    )}
                  </AmountContainer>
                </RecipeContainer>
              ))}

            <div>
              Aisle:{" "}
              {(shoppingListItems?.length &&
                shoppingListItems[0]?.ingredient?.aisle?.name) ||
                (shoppingListItems?.length &&
                  shoppingListItems[0]?.ingredient?.aisle)}
            </div>
            <div>
              Home Area:{" "}
              {(shoppingListItems?.length &&
                shoppingListItems[0]?.ingredient?.homeArea?.name) ||
                (shoppingListItems?.length &&
                  shoppingListItems[0]?.ingredient?.homeArea)}
            </div>
            <div>
              Units:{" "}
              {shoppingListItems?.length &&
                shoppingListItems[0]?.ingredient?.units}
            </div>
            <div>
              Store:{" "}
              {(shoppingListItems?.length &&
                shoppingListItems[0]?.ingredient?.store?.name) ||
                (shoppingListItems?.length &&
                  shoppingListItems[0]?.ingredient?.store)}
            </div>
            <ButtonContainer>
              <EditIngredientButton
                id={
                  shoppingListItems?.length &&
                  shoppingListItems[0]?.ingredient?._id
                }
              />
              <DeleteFromShoppingListButton
                shoppingListItem={
                  shoppingListItems?.length && shoppingListItems[0]
                }
                isInList={false}
              />
            </ButtonContainer>
          </div>
        </SingleItemStyles>
      )}
    </div>
  );
}
