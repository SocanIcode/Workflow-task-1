// utils.js

export function isStrongPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}

export function showError(form, name, message) {
  const field = form.querySelector(`[name='${name}']`);
  const error = document.createElement("p");
  error.textContent = message;
  error.className = "text-red-500 text-sm mt-1";
  field.insertAdjacentElement("afterend", error);
  field.classList.add("border-red-500");
}

export function clearErrors(form) {
  form.querySelectorAll("p.text-red-500").forEach((el) => el.remove());
  form
    .querySelectorAll("input")
    .forEach((el) => el.classList.remove("border-red-500"));
}
