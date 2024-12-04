"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "../../../lib/useForm";
import getRecipes from "../../../recipes/getRecipes";
import addRecipeImage from "../../../recipes/add/addRecipeImage";
import editRecipe from "./editRecipe";
import RecipeForm from "../../../components/RecipeForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";

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
    return tempRecipes;
  };

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipeQuery"],
    queryFn: fetchRecipe,
  });

  const editRecipeMutation = useMutation({
    mutationFn: async (vars: { img: any }) => {
      await editRecipe({
        id: params.id,
        ...inputs,
        photoId: vars?.img?._id,
      });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["shoppingListItems"] });
      setLoading(false);
      router.push("/recipes");
    },
  });

  useEffect(() => {
    if (recipes) {
      setInputs({ ...inputs, ...recipes[0] });
    }
  }, [recipes]);

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
      // await editRecipe({
      //   id: params.id,
      //   ...inputs,
      //   photoId: img?._id,
      // });
      await editRecipeMutation.mutate({ img });
      // setLoading(false);
      // router.push("/recipes");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="details">
          <ThreeDots
            visible={true}
            height="15"
            width="40"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              display: "grid",
              justifyItems: "center",
            }}
            wrapperClass=""
          />
        </div>
      ) : (
        <RecipeForm
          handleChange={handleChange}
          inputs={inputs}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          loading={loading}
          formName={"Edit"}
        />
      )}
    </div>
  );
}
