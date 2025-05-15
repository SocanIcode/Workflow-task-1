import { isStrongPassword, showError, clearErrors } from "./utils.js";

const form = document.getElementById("registrationForm");
const STORAGE_KEY = "registrationData";

// Prefill  localStorage data
document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    for (const [key, value] of Object.entries(savedData)) {
      const field = form.querySelector(`[name='${key}']`);
      if (field) field.value = value;
    }
  }
});

// Save on input
form.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  clearErrors(form);

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  let hasError = false;

  if (data.email !== data.confirmEmail) {
    showError(form, "confirmEmail", "Emails do not match");
    hasError = true;
  }

  if (!isStrongPassword(data.password)) {
    showError(
      form,
      "password",
      "Password must be at least 8 characters and contain a number",
    );
    hasError = true;
  }

  if (!/^[0-9]{4,10}$/.test(data.zipcode)) {
    showError(form, "zipcode", "Invalid Zip Code");
    hasError = true;
  }

  if (hasError) return;

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("API request failed");

    const result = await response.json();
    console.log("Success:", result);
    alert("Registration successful!");
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Submit error:", err);
    alert("Something went wrong!");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});
