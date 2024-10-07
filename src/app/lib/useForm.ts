import { ChangeEvent, useEffect, useState } from "react";


export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState<any>(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    let { value, name } = e.target;

    console.log({value, name, initial});
    
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return {
    inputs,
    setInputs,
    handleChange
  };
}