"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getShoppingListItems from "../getShoppingListItems";
import editShoppingListItem from "./editShoppingListItem";
import useForm from "../../lib/useForm";
import DeleteFromShoppingListButton from "../../components/DeleteFromShoppingListButton";
import EditIngredientButton from "../../components/EditIngredientButton";

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

export default function Page({ params }: { params: { id: string } }) {
  const [shoppingListItem, setShoppingListItem] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { handleChange, inputs, setInputs } = useForm({
    quantity: "",
  });

  const fetchShoppingListItem = async () => {
    const res = await getShoppingListItems({ id: params.id });
    const tempShoppingListItems = JSON.parse(res as string);
    setShoppingListItem(tempShoppingListItems[0]);
    setInputs({ ...inputs, quantity: tempShoppingListItems[0]?.quantity / 10 });
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      await editShoppingListItem({
        id: shoppingListItem?._id,
        quantity: inputs?.quantity,
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
            <AmountContainer>
              <h4>
                Amount:{" "}
                {isEditing ? (
                  <EditInput
                    required
                    type="text"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity"
                    value={inputs?.quantity}
                    onChange={handleChange}
                  />
                ) : inputs?.quantity ? (
                  inputs?.quantity
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
                      handleSubmit();
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
            <div>Recipe(s): {shoppingListItem?.recipe?.name || ""}</div>
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
