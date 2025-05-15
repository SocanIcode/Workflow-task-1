import "./script.js";

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    if (data.email !== data.confirmEmail) {
      alert("Emails do not match!");
      return;
    }

    console.log("Form data:", data);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) throw new Error("Failed to submit data");

      const result = await response.json();
      console.log("API Response:", result);
      alert("Form submitted successfully!");
      this.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
  });
