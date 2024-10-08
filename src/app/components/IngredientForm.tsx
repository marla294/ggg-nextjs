import styled from "styled-components";
import units from "../lib/units";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import getStores from "../stores/getStores";
import getHomeAreas from "../homeAreas/getHomeAreas";
import getAisles from "../aisles/getAisles";

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
    height: 40px;
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

const IngredientForm = ({
  handleChange,
  inputs,
  handleSubmit,
  loading,
  handleImageChange,
  formName,
}: {
  handleChange: any;
  inputs: any;
  handleSubmit: any;
  loading: boolean;
  handleImageChange: any;
  formName: string;
}) => {
  const [stores, setStores] = useState<any>(null);
  const [homeAreas, setHomeAreas] = useState<any>(null);
  const [aisles, setAisles] = useState<any>(null);

  useEffect(() => {
    const fetchStores = async () => {
      const tempStores = await getStores();
      const parsedStores = await JSON.parse(tempStores as string);
      setStores(parsedStores);
    };
    const fetchHomeAreas = async () => {
      const tempHomeAreas = await getHomeAreas();
      const parsedHomeAreas = await JSON.parse(tempHomeAreas as string);
      setHomeAreas(parsedHomeAreas);
    };
    const fetchAisles = async () => {
      const tempAisles = await getAisles();
      const parsedAisles = await JSON.parse(tempAisles as string);
      setAisles(parsedAisles);
    };

    fetchStores();
    fetchHomeAreas();
    fetchAisles();
  }, []);

  return (
    <FormStyles onSubmit={handleSubmit}>
      <h2>{formName ? formName : "Edit"} Ingredient</h2>
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
        Image (if no update, leave blank)
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
      <label htmlFor="storeId">
        Store
        <select
          name="storeId"
          id="storeId"
          onChange={handleChange}
          value={inputs.storeId || 1}>
          <option value={1} key={1}>
            Uncategorized
          </option>
          {stores?.map((store: any) => (
            <option value={store?._id} key={store?._id}>
              {store?.name}
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
          value={inputs?.units}>
          {units.map((unit) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="aisleId">
        Aisle
        <select
          name="aisleId"
          id="aisleId"
          onChange={handleChange}
          value={inputs.aisleId || 1}>
          <option value={1} key={1}>
            Uncategorized
          </option>
          {aisles?.map((aisle: any) => (
            <option value={aisle?._id} key={aisle?._id}>
              {aisle?.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="homeAreaId">
        Home Area
        <select
          name="homeAreaId"
          id="homeAreaId"
          onChange={handleChange}
          value={inputs.homeAreaId || 1}>
          <option value={1} key={1}>
            Uncategorized
          </option>
          {homeAreas?.map((homeArea: any) => (
            <option value={homeArea?._id} key={homeArea?._id}>
              {homeArea?.name}
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
            <>Submit</>
          )}
        </button>
      </LoadingContainer>
    </FormStyles>
  );
};

export default IngredientForm;
