"use client";
import { useState } from "react";
import addIngredient from "./addIngredient";
import addIngredientImage from "./addIngredientImage";
import { useRouter } from "next/navigation";
import useForm from "../../lib/useForm";
import IngredientForm from "../../components/IngredientForm";

export default function AddIngredient() {
  const router = useRouter();
  const { handleChange, inputs } = useForm({
    name: "",
    description: "",
    store: "",
    units: "",
    aisle: "",
    homeArea: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

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

    try {
      await addIngredient({
        ...inputs,
        photoId: tempIngredientImage?._id,
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
        formName={"Add"}
      />
    </div>
  );
}
