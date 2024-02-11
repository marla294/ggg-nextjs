"use client";
import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import addIngredient from "./addIngredient";
import styled from "styled-components";
import stores from "../../lib/stores";

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
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addIngredient({ ...inputs });
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
      </FormStyles>
    </div>
  );
}
