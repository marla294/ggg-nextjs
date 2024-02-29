"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import addIngredient from "./addIngredient";
// import addIngredientImage from "./addIngredientImage";
import styled from "styled-components";
import stores from "../../../lib/stores";
import units from "../../../lib/units";
import aisles from "../../../lib/aisles";
import homeAreas from "../../../lib/homeAreas";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import getIngredients from "../../../ingredients/getIngredients";
import editIngredient from "./editIngredient";
import addIngredientImage from "../../../ingredients/add/addIngredientImage";
import useForm from "../../../lib/useForm";
import IngredientForm from "../../../components/IngredientForm";

const FormStyles = styled.form`
  box-shadow: var(--bs);
  padding: 2rem;
  font-size: 1.2rem;
  label {
    display: block;
    font-weight: 450;
    margin-bottom: 0.25rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    font-size: 1.2rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--orange);
    }
  }
  h2 {
    font-weight: 350;
  }
  button {
    width: auto;
    padding: 0.7rem 1rem;
    transition: 0.2s;
  }

  .submit {
    background: var(--lime);
    color: var(--darkGreen);
    border: 1px solid var(--darkGreen);
    &:hover {
      background: var(--darkGreen);
      color: white;
    }
  }

  .clear {
    background: var(--yellow);
    color: var(--darkYellow);
    border: 1px solid var(--darkYellow);
    &:hover {
      background: var(--darkYellow);
      color: white;
    }
  }

  .cancel {
    background: var(--orange);
    color: var(--darkOrange);
    border: 1px solid var(--darkOrange);
    &:hover {
      background: var(--darkOrange);
      color: white;
    }
  }
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 500px;
  align-items: center;
  margin-top: 1rem;
  grid-gap: 2rem;
`;

const LoadingStyles = styled.div`
  color: green;
`;

export default function EditIngredient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { handleChange, inputs, setInputs } = useForm({
    name: "",
    description: "",
    store: "",
    units: "",
    aisle: "",
    homeArea: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchIngredient = async () => {
    const res = await getIngredients({ id: params.id });
    const tempIngredients = JSON.parse(res as string);
    setInputs({ ...inputs, ...tempIngredients[0] });
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  const handleImageChange = (changeEvent: any) => {
    const reader = new FileReader();

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const fileInput: any = Array.from(form.elements).find(
      ({ name }: any) => name === "image"
    );

    let img = null;

    if (fileInput.files.length) {
      const formData = new FormData();

      for (const file of fileInput.files) {
        formData.append("file", file);
      }

      formData.append("upload_preset", "sickfits");

      const cloudinaryData = await fetch(
        `https://api.cloudinary.com/v1_1/dczyzum8v/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      const ingredientImageResult = await addIngredientImage({
        altText: cloudinaryData.original_filename,
        url: cloudinaryData.url,
      });

      const [tempIngredientImage] = await JSON.parse(
        ingredientImageResult as string
      );

      img = tempIngredientImage;
    }

    try {
      await editIngredient({
        id: params.id,
        ...inputs,
        photoId: img?._id,
      });
      setLoading(false);
      router.push("/ingredients");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <IngredientForm
        handleChange={handleChange}
        inputs={inputs}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
