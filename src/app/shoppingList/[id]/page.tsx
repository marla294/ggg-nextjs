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
  grid-template-columns: 1fr 1fr;
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
            {!isEditing && (
              <h4>
                Amount: {inputs?.quantity ? inputs?.quantity : 0}{" "}
                {shoppingListItem?.ingredient?.units === "none"
                  ? ""
                  : shoppingListItem?.ingredient?.units}{" "}
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}>
                  Edit
                </button>
              </h4>
            )}
            {isEditing && (
              <AmountContainer>
                <h4>
                  Amount:{" "}
                  <input
                    required
                    type="text"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity"
                    value={inputs?.quantity}
                    onChange={handleChange}
                  />{" "}
                  {shoppingListItem?.ingredient?.units === "none"
                    ? ""
                    : shoppingListItem?.ingredient?.units}{" "}
                </h4>
                <EditButtonContainer>
                  <button
                    onClick={() => {
                      handleSubmit();
                      setIsEditing(false);
                    }}>
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                    }}>
                    &times;
                  </button>
                </EditButtonContainer>
              </AmountContainer>
            )}
            <div>Aisle: {shoppingListItem?.ingredient?.aisle}</div>
            <div>Home Area: {shoppingListItem?.ingredient?.homeArea}</div>
            <div>Units: {shoppingListItem?.ingredient?.units}</div>
            <div>Store: {shoppingListItem?.ingredient?.store}</div>
            <ButtonContainer>
              <DeleteFromShoppingListButton
                shoppingListItem={shoppingListItem}
                isInList={false}
              />
              <EditIngredientButton id={shoppingListItem?.ingredient?._id} />
            </ButtonContainer>
          </div>
        </SingleItemStyles>
      )}
    </div>
  );
}
