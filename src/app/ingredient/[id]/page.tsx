"use client";
import { useEffect, useState } from "react";
import getIngredients from "../../ingredients/getIngredients";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import deleteIngredient from "./deleteIngredient";
import addIngredientToShoppingList from "./addIngredientToShoppingList";

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

const DeleteButton = styled.button`
  width: 200px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--orange);
  color: var(--darkOrange);
  border: 1px solid var(--darkOrange);
`;

const EditButton = styled.button`
  width: 200px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--green);
  color: black;
  border: 1px solid var(--darkGreen);
`;

const AddToShoppingListButton = styled.button`
  width: 200px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  background: var(--yellow);
  color: black;
  border: 1px solid var(--darkYellow);
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
`;

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [ingredient, setIngredient] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [addToShoppingListLoading, setAddToShoppingListLoading] =
    useState<boolean>(false);

  const fetchIngredient = async () => {
    const res = await getIngredients({ id: params.id });
    const tempIngredients = JSON.parse(res as string);
    setIngredient(tempIngredients[0]);
    setLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteIngredient({
        ingredientId: ingredient?._id,
      });
      setLoading(false);
      router.push("/ingredients");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  useEffect(() => {
    if (ingredient?.photo?.image?._meta?.url) {
      setImageUrl(ingredient?.photo?.image?._meta?.url);
    }
    if (ingredient?.photo?.imageUrl) {
      setImageUrl(ingredient?.photo?.imageUrl);
    }
  }, [ingredient]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <SingleItemStyles>
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={ingredient?.photo?.altText || ingredient?.name}
              />
            ) : (
              <div className="noPhoto">Needs photo 📸</div>
            )}
          </div>
          <div>
            <h3>{ingredient?.name}</h3>
            <div>Aisle: {ingredient?.aisle}</div>
            <div>Home Area: {ingredient?.homeArea}</div>
            <div>Units: {ingredient?.units}</div>
            <div>Store: {ingredient?.store}</div>
            <ButtonContainer>
              <DeleteButton
                type="button"
                onClick={() => {
                  handleDelete();
                }}>
                {deleteLoading ? (
                  <ThreeDots
                    visible={true}
                    height="13"
                    width="40"
                    color="#551d11"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                      display: "grid",
                      justifyItems: "center",
                    }}
                    wrapperClass=""
                  />
                ) : (
                  "Delete Ingredient"
                )}
              </DeleteButton>
              <EditButton
                type="button"
                onClick={() => {
                  setEditLoading(true);
                  router.push(`/ingredient/${params.id}/edit`);
                }}>
                {editLoading ? (
                  <ThreeDots
                    visible={true}
                    height="13"
                    width="40"
                    color="#1e830f"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                      display: "grid",
                      justifyItems: "center",
                    }}
                    wrapperClass=""
                  />
                ) : (
                  "Edit Ingredient"
                )}
              </EditButton>
              <AddToShoppingListButton
                type="button"
                onClick={() => {
                  setAddToShoppingListLoading(true);
                  addIngredientToShoppingList({ ingredientId: params.id });
                  router.push(`/shoppingList`);
                }}>
                {addToShoppingListLoading ? (
                  <ThreeDots
                    visible={true}
                    height="13"
                    width="40"
                    color="#554100"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                      display: "grid",
                      justifyItems: "center",
                    }}
                    wrapperClass=""
                  />
                ) : (
                  "Add 1 To Shopping List"
                )}
              </AddToShoppingListButton>
            </ButtonContainer>
          </div>
        </SingleItemStyles>
      )}
    </div>
  );
}
