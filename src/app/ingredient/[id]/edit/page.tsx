"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import addIngredient from "./addIngredient";
import addIngredientImage from "./addIngredientImage";
import styled from "styled-components";
import stores from "../../../lib/stores";
import units from "../../../lib/units";
import aisles from "../../../lib/aisles";
import homeAreas from "../../../lib/homeAreas";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

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

export default function EditIngredient() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    store: "",
    units: "",
    aisle: "",
    homeArea: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name, type } = e.target;

    if (type !== "file") {
      setInputs({ ...inputs, [name]: value });
    }
  };

  function handleImageChange(changeEvent: any) {
    const reader = new FileReader();

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

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
      <FormStyles onSubmit={handleSubmit}>
        <h2>Add New Ingredient</h2>
        <label>
          Name<span className="required">&nbsp;*</span>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            rows={7}
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="store">
          Store
          <select
            name="store"
            id="store"
            onChange={handleChange}
            value={inputs.store}>
            {stores.map((store) => (
              <option value={store} key={store}>
                {store}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="units">
          Units
          <select
            name="units"
            id="units"
            onChange={handleChange}
            value={inputs.units}>
            {units.map((unit) => (
              <option value={unit} key={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="aisle">
          Aisle
          <select
            name="aisle"
            id="aisle"
            onChange={handleChange}
            value={inputs.aisle}>
            {aisles.map((aisle) => (
              <option value={aisle} key={aisle}>
                {aisle}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="homeArea">
          Home Area
          <select
            name="homeArea"
            id="homeArea"
            onChange={handleChange}
            value={inputs.homeArea}>
            {homeAreas.map((homeArea) => (
              <option value={homeArea} key={homeArea}>
                {homeArea}
              </option>
            ))}
          </select>
        </label>
        <LoadingContainer>
          <button type="submit" className="submit">
            {loading ? (
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
            ) : (
              "Add Ingredient"
            )}
          </button>
        </LoadingContainer>
      </FormStyles>
    </div>
  );
}
