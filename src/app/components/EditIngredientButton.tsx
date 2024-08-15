"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import ButtonStyles from "./styles/ButtonStyles";

const EditButton = styled.button`
  ${ButtonStyles}
  background: var(--green);
  color: black;
  border: 1px solid var(--darkGreen);
`;

export default function EditIngredientButton({ id }: { id: string }) {
  const router = useRouter();
  const [editLoading, setEditLoading] = useState<boolean>(false);

  return (
    <EditButton
      type="button"
      onClick={() => {
        setEditLoading(true);
        router.push(`/ingredient/${id}/edit`);
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
