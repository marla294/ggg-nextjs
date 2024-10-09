"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getShoppingListItems from "../getShoppingListItems";
import editShoppingListItem from "./editShoppingListItem";
import useForm from "../../lib/useForm";
import DeleteFromShoppingListButton from "../../components/DeleteFromShoppingListButton";
import EditIngredientButton from "../../components/EditIngredientButton";
import { useSearchParams } from "next/navigation";

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
  const [shoppingListItem, setShoppingListItem] = useState<any>();
  const [shoppingListItems, setShoppingListItems] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { handleChange, inputs, setInputs } = useForm({});
  const searchParams = useSearchParams();
  const sortBy = searchParams?.get("sortBy");

  const fetchShoppingListItem = async () => {
    let filterShoppingListItems: any;
    if (sortBy === "recipe") {
      filterShoppingListItems = { id: params.id };
    } else {
      filterShoppingListItems = { ingredientId: params.id };
    }

    const res = await getShoppingListItems(filterShoppingListItems);
    const tempShoppingListItems = JSON.parse(res as string);

    setShoppingListItem(tempShoppingListItems[0]);
    setShoppingListItems(tempShoppingListItems);

    let items = {};

    tempShoppingListItems.forEach((item: any) => {
      items = { ...items, [`quantity_${item._id}`]: item.quantity / 10 };
    });

    setInputs({ ...inputs, ...items });
    setLoading(false);
  };

  const handleSubmit = async (shoppingListItemId: string, quantity: number) => {
    try {
      await editShoppingListItem({
        id: shoppingListItemId,
        quantity: quantity,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchShoppingListItem();
  }, []);

  useEffect(() => {
    if (shoppingListItem?.ingredient?.photo?.image?._meta?.url) {
      setImageUrl(shoppingListItem?.ingredient?.photo?.image?._meta?.url);
    }
    if (shoppingListItem?.ingredient?.photo?.imageUrl) {
      setImageUrl(shoppingListItem?.ingredient?.photo?.imageUrl);
    }
  }, [shoppingListItem]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <SingleItemStyles>
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={
                  shoppingListItem?.ingredient?.photo?.altText ||
                  shoppingListItem?.ingredient?.name
                }
              />
            ) : (
              <div className="noPhoto">Needs photo 📸</div>
            )}
          </div>
          <div>
            <h3>{shoppingListItem?.ingredient?.name}</h3>
            {shoppingListItems?.map((item: any) => (
              <RecipeContainer key={item?._id}>
                <div>{item?.recipe?.name}</div>
                <AmountContainer>
                  <h4>
                    Amount:{" "}
                    {isEditing ? (
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
                    {shoppingListItem?.ingredient?.units === "none"
                      ? ""
                      : shoppingListItem?.ingredient?.units}{" "}
                  </h4>
                  {!isEditing && (
                    <EditAmountButton
                      onClick={() => {
                        setIsEditing(true);
                      }}>
                      Edit Amount
                    </EditAmountButton>
                  )}
                  {isEditing && (
                    <EditButtonContainer>
                      <SubmitAmountButton
                        onClick={() => {
                          handleSubmit(
                            item._id,
                            inputs[`quantity_${item._id}`]
                          );
                          setIsEditing(false);
                        }}>
                        Submit
                      </SubmitAmountButton>
                      <CancelEditAmountButton
                        onClick={() => {
                          setIsEditing(false);
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
              {shoppingListItem?.ingredient?.aisle?.name ||
                shoppingListItem?.ingredient?.aisle}
            </div>
            <div>
              Home Area:{" "}
              {shoppingListItem?.ingredient?.homeArea?.name ||
                shoppingListItem?.ingredient?.homeArea}
            </div>
            <div>Units: {shoppingListItem?.ingredient?.units}</div>
            <div>
              Store:{" "}
              {shoppingListItem?.ingredient?.store?.name ||
                shoppingListItem?.ingredient?.store}
            </div>
            <ButtonContainer>
              <EditIngredientButton id={shoppingListItem?.ingredient?._id} />
              <DeleteFromShoppingListButton
                shoppingListItem={shoppingListItem}
                isInList={false}
              />
            </ButtonContainer>
          </div>
        </SingleItemStyles>
      )}
    </div>
  );
}
