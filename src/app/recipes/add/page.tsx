"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "../../lib/useForm";
import RecipeForm from "../../components/RecipeForm";
import addRecipeImage from "./addRecipeImage";
import addRecipe from "./addRecipe";

export default function AddRecipe() {
  const router = useRouter();
  const { handleChange, inputs } = useForm({
    name: "",
    recipeLink: "",
    description: "",
    type: "",
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

    const recipeImageResult = await addRecipeImage({
      altText: cloudinaryData.original_filename,
      url: cloudinaryData.url,
    });

    const [tempRecipeImage] = await JSON.parse(recipeImageResult as string);

    try {
      await addRecipe({
        ...inputs,
        photoId: tempRecipeImage?._id,
      });
      setLoading(false);
      router.push("/recipes");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <RecipeForm
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
