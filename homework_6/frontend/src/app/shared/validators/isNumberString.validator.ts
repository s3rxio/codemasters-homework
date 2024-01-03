import { ValidatorFn } from "@angular/forms";

export const isNumberString: ValidatorFn = control => {
  const { value } = control;
  console.table({
    value,
    typeof: typeof value,
    number: Number(value),
    isNumber: !isNaN(Number(value)),
    fullCondition: typeof value === "number" || (value && !isNaN(Number(value)))
  });

  if (typeof value === "number" || (value && !isNaN(Number(value)))) {
    return null;
  }

  return {
    isNumber: true
  };
};
