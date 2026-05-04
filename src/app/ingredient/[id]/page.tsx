"use client";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import addIngredientToShoppingList from "./addIngredientToShoppingList";
import EditIngredientButton from "../../components/EditIngredientButton";
import ButtonStyles from "../../components/styles/ButtonStyles";
import useIngredient from "./useIngredient";

const CenteredContainer = styled.div`
  height: 50vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const InlineBlockContainer = styled.div`
  display: inline-block;
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
  ${ButtonStyles}
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
  z-index: 1;
  font-size: 1rem;
`;

const AddToShoppingListButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${ButtonStyles}
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

  const {
    ingredient,
    loading,
    imageUrl,
    deleteLoading,
    recipesLoading,
    addToShoppingListLoading,
    setAddToShoppingListLoading,
    quantity,
    recipes,
    handleDelete,
    handleQuantityChange,
  } = useIngredient(params.id);

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
            <div>Aisle: {ingredient?.aisle?.name || ingredient?.aisle}</div>
            <div>
              Home Area: {ingredient?.homeArea?.name || ingredient?.homeArea}
            </div>
            <div>Units: {ingredient?.units}</div>
            <div>Store: {ingredient?.store?.name || ingredient?.store}</div>
            <div>
              Recipes:{" "}
              {recipesLoading ? (
                <InlineBlockContainer>
                  <ThreeDots
                    visible={true}
                    height="13"
                    width="40"
                    color="#aaaf1d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                </InlineBlockContainer>
              ) : (
                recipes?.join(", ") || "none"
              )}
            </div>
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
