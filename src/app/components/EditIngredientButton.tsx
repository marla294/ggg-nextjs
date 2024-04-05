import styled from "styled-components";

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

export default function EditIngredientButton() {
  return (
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
  );
}
