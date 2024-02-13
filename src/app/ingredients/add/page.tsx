"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import addIngredient from "./addIngredient";
import addIngredientImage from "./addIngredientImage";
import styled from "styled-components";
import stores from "../../lib/stores";
import units from "../../lib/units";
import aisles from "../../lib/aisles";
import homeAreas from "../../lib/homeAreas";

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
    margin: 1.5rem 1rem 0.5rem 0;
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

export default function AddIngredient() {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    store: "",
    units: "",
    aisle: "",
    homeArea: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name, type } = e.target;

    if (type === "file") {
      const files = (e as ChangeEvent<HTMLInputElement>).target.files;
      if (files?.length) {
        setInputs({ ...inputs, [name]: files[0] });
      }
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await addIngredient({ ...inputs });
    const [tempIngredient] = JSON.parse(res as string);
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
          <input type="file" id="image" name="image" onChange={handleChange} />
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
        <button type="submit" className="submit">
          Add Ingredient
        </button>
      </FormStyles>
    </div>
  );
}
