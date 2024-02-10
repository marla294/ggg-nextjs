"use client";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import addIngredient from "./addIngredient";

export default function AddIngredient() {
  const [inputs, setInputs] = useState({ name: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIngredient({ ...inputs });
  };

  return (
    <div>
      Add New Ingredient
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input name="name" value={inputs.name} onChange={handleChange} />
        </label>
      </form>
    </div>
  );
}
