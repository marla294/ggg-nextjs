"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import getShoppingListItems from "../getShoppingListItems";
import deleteShoppingListItem from "./deleteShoppingListItem";

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

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
`;

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [shoppingListItem, setShoppingListItem] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const fetchShoppingListItem = async () => {
    const res = await getShoppingListItems({ id: params.id });
    const tempShoppingListItems = JSON.parse(res as string);
    setShoppingListItem(tempShoppingListItems[0]);
    setLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteShoppingListItem({
        shoppingListItemId: shoppingListItem?._id,
      });
      setLoading(false);
      router.push("/shoppingList");
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
            <h4>Amount: {shoppingListItem?.quantity / 10}</h4>
            <div>Aisle: {shoppingListItem?.ingredient?.aisle}</div>
            <div>Home Area: {shoppingListItem?.ingredient?.homeArea}</div>
            <div>Units: {shoppingListItem?.ingredient?.units}</div>
            <div>Store: {shoppingListItem?.ingredient?.store}</div>
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
                  "Remove from shopping list"
                )}
              </DeleteButton>
            </ButtonContainer>
          </div>
        </SingleItemStyles>
      )}
    </div>
  );
}
