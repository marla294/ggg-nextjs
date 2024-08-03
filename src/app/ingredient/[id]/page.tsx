"use client";
import { useEffect, useState } from "react";
import getIngredients from "../../ingredients/getIngredients";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import deleteIngredient from "./deleteIngredient";
import addIngredientToShoppingList from "./addIngredientToShoppingList";
import EditIngredientButton from "../../components/EditIngredientButton";

const CenteredContainer = styled.div`
  height: 50vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

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
  width: 300px;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  background: var(--orange);
  color: var(--darkOrange);
  border: 1px solid var(--darkOrange);
`;

const AddToShoppingListButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const AddToShoppingListInput = styled.input`
  position: relative;
  width: 25px;
  margin-left: 98px;
  top: 4px;
  z-index: 100000;
  font-size: 1rem;
`;

const AddToShoppingListButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  transition: 0.2s;
  height: 37.84px;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  background: var(--yellow);
  color: black;
  border: 1px solid var(--darkYellow);
`;

const AddingToShoppingListLoadingMessage = styled.div`
  color: var(--green);
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
  const [addToShoppingListLoading, setAddToShoppingListLoading] =
    useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

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

  const handleQuantityChange = (e: any) => {
    const val = e.target.value;
    setQuantity(val);
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
      {loading && (
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
            <div>
              Home Area: {ingredient?.homeArea?.name || ingredient?.homeArea}
            </div>
            <div>Units: {ingredient?.units}</div>
            <div>Store: {ingredient?.store?.name || ingredient?.store}</div>
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
              <EditIngredientButton id={params.id} />
              <AddToShoppingListButtonWrapper>
                <AddToShoppingListInput
                  required
                  type="text"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <AddToShoppingListButton
                  type="button"
                  onClick={async () => {
                    setAddToShoppingListLoading(true);
                    await addIngredientToShoppingList({
                      ingredientId: params.id,
                      quantity,
                    });
                    router.push(`/ingredients`);
                  }}>
                  Add &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; To Shopping
                  List
                </AddToShoppingListButton>
              </AddToShoppingListButtonWrapper>
            </ButtonContainer>
            {addToShoppingListLoading && (
              <AddingToShoppingListLoadingMessage>
                Adding to shopping list...
              </AddingToShoppingListLoadingMessage>
            )}
          </div>
        </SingleItemStyles>
      )}
    </div>
  );
}
