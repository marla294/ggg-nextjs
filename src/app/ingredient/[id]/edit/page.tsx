"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import getIngredients from "../../../ingredients/getIngredients";
import editIngredient from "./editIngredient";
import addIngredientImage from "../../../ingredients/add/addIngredientImage";
import useForm from "../../../lib/useForm";
import IngredientForm from "../../../components/IngredientForm";

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
        formName={"Edit"}
      />
    </div>
  );
}
