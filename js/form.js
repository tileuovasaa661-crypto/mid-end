
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = ["name", "email", "age", "character", "subject", "message", "agreement"];

  const message = document.getElementById("message");
  const counter = document.getElementById("messageCounter");
  const success = document.getElementById("formSuccess");

  function showError(id, text) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    error.textContent = text;
  }

  function clearError(id) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    error.textContent = "";
  }

  function validateField(id) {
    const input = document.getElementById(id);
    const value = input.type === "checkbox"
      ? input.checked
      : input.value.trim();

    if (!value) {
      showError(id, "This field is required.");
      return false;
    }

    if (id === "name" && value.length < 2) {
      showError(id, "Name must contain at least 2 characters.");
      return false;
    }

    if (id === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showError(id, "Please enter a valid email address.");
        return false;
      }
    }

    if (id === "age") {
      const age = Number(value);
      if (!Number.isInteger(age) || age < 10 || age > 120) {
        showError(id, "Age must be between 10 and 120.");
        return false;
      }
    }

    if (id === "subject" && value.length < 5) {
      showError(id, "Subject must contain at least 5 characters.");
      return false;
    }

    if (id === "message") {
      if (value.length < 10) {
        showError(id, "Message must contain at least 10 characters.");
        return false;
      }

      if (value.length > 500) {
        showError(id, "Message cannot exceed 500 characters.");
        return false;
      }
    }

    clearError(id);
    return true;
  }

  fields.forEach(function (id) {
    const input = document.getElementById(id);

    const eventName =
      input.type === "checkbox" || input.tagName === "SELECT"
        ? "change"
        : "input";

    input.addEventListener(eventName, function () {
      if (input.classList.contains("is-invalid")) {
        validateField(id);
      }

      success.classList.add("d-none");
    });
  });

  message.addEventListener("input", function () {
    counter.textContent = message.value.length + " / 500 characters";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let valid = true;

    fields.forEach(function (id) {
      if (!validateField(id)) {
        valid = false;
      }
    });

    if (!valid) {
      success.classList.add("d-none");
      return;
    }

    const name = document.getElementById("name").value.trim();

    success.textContent =
      "Thank you, " + name +
      "! Your message to the Other World has been received.";

    success.classList.remove("d-none");
    form.reset();

    fields.forEach(function (id) {
      document.getElementById(id).classList.remove("is-valid");
    });

    counter.textContent = "0 / 500 characters";
  });

  form.addEventListener("reset", function () {
    fields.forEach(function (id) {
      const input = document.getElementById(id);

      input.classList.remove("is-invalid", "is-valid");
      document.getElementById(id + "Error").textContent = "";
    });

    success.classList.add("d-none");
    counter.textContent = "0 / 500 characters";
  });
});
