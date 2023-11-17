const form = document.querySelector("#registration-form");

// Страшное регулярное выражение для проверки почты
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const passwordRegex = /(?=.*[^a-zA-Z])/;

/**
 * @param {HTMLInputElement} field - The field to be add the error.
 * @param {string} msg - The error message.
 */
const addError = (field, msg) => {
  const errorElement = field.querySelector(".text-field__error");

  errorElement.textContent = msg;
  errorElement?.classList.add("text-field__error_visible");
};

/**
 * @param {HTMLInputElement} field - The field to be removed the error.
 */
const removeError = field => {
  const errorElement = field.querySelector(".text-field__error");

  errorElement?.classList.remove("text-field__error_visible");
};

form.addEventListener("submit", event => {
  event.preventDefault();

  const { fullName, email, password, confirmPassword, agree } =
    event.currentTarget;

  if (!validateFields(fullName, email, password, confirmPassword, agree)) {
    return;
  }

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  localStorage.setItem("data", JSON.stringify(data));

  form.querySelector(".form__fields").remove();
  form.querySelector(".form__button").remove();
  form.querySelector(".form__title").textContent = "Вы успешно создали аккаунт";
});

/**
 * @param {...HTMLInputElement} fields - The fields to be validated.
 */
const validateFields = (...fields) => {
  fields.forEach(field => {
    const fieldParent = field.parentNode;
    const fieldRoot = fieldParent.parentNode;

    const fieldValue = field.value.trim();
    const fieldData = field.dataset;

    if (field.type === "checkbox" && fieldData.required && !field.checked) {
      fieldParent.classList.add("checkbox_error");
      return;
    } else {
      fieldParent.classList.remove("checkbox_error");
    }

    if (fieldData.required && !fieldValue) {
      addError(fieldRoot, "This field is required");
      return;
    } else {
      removeError(fieldRoot);
    }

    if (fieldData.minLength && fieldValue.length < fieldData.minLength) {
      addError(fieldRoot, `Minimum length is ${fieldData.minLength}`);
      return;
    } else {
      removeError(fieldRoot);
    }

    if (fieldData.maxLength && fieldValue.length > fieldData.maxLength) {
      addError(fieldRoot, `Maximum length is ${fieldData.maxLength}`);
      return;
    } else {
      removeError(fieldRoot);
    }

    if (field.type === "email" && !emailRegex.test(fieldValue)) {
      addError(fieldRoot, "Invalid email");
      return;
    } else {
      removeError(fieldRoot);
    }

    if (field.type === "password" && !passwordRegex.test(fieldValue)) {
      addError(fieldRoot, "Invalid password");
      return;
    } else {
      removeError(fieldRoot);
    }

    if (
      field.id === "confirmPassword" &&
      fieldValue !== fields.find(field => field.id === "password").value
    ) {
      addError(fieldRoot, "Passwords do not match");
      return;
    } else {
      removeError(fieldRoot);
    }
  });

  return fields.every(field =>
    field.type === "checkbox"
      ? !field.parentElement.classList.contains("checkbox_error")
      : !field.parentElement.parentElement.querySelector(
          ".text-field__error_visible"
        )
  );
};
