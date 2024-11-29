"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "../../../lib/useForm";
import IngredientForm from "../../../components/IngredientForm";
import getRecipes from "../../../recipes/getRecipes";
import addRecipeImage from "../../../recipes/add/addRecipeImage";
import editRecipe from "./editRecipe";
import RecipeForm from "../../../components/RecipeForm";

export default function EditRecipe({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { handleChange, inputs, setInputs } = useForm({
    name: "",
    type: "",
    recipeLink: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecipe = async () => {
    const res = await getRecipes({ id: params.id });
    const tempRecipes = JSON.parse(res as string);
    setInputs({ ...inputs, ...tempRecipes[0] });
  };

  // TODO: Convert to react-query
  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleImageChange = (changeEvent: any) => {
    const reader = new FileReader();

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  // TODO: Convert to react-query
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

      const recipeImageResult = await addRecipeImage({
        altText: cloudinaryData.original_filename,
        url: cloudinaryData.url,
      });

      const [tempRecipeImage] = await JSON.parse(recipeImageResult as string);

      img = tempRecipeImage;
    }

    try {
      await editRecipe({
        id: params.id,
        ...inputs,
        photoId: img?._id,
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
        formName={"Edit"}
      />
    </div>
  );
}
