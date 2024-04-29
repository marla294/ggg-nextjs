import { useState } from "react";
import { FormStyles } from "./IngredientForm";
import { ThreeDots } from "react-loader-spinner";
import { IngredientsBarStyles } from "../ingredients/page";

const AddIngredientToRecipeForm = ({ loading }: { loading: boolean }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  return (
    <FormStyles>
      <h3>Add Ingredient To Recipe</h3>
      <IngredientsBarStyles>
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </IngredientsBarStyles>
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
    </FormStyles>
  );
};

export default AddIngredientToRecipeForm;
