// src/hooks/useRegisterUser.js
import { useState } from "react";

export const useRegisterUser = (navigate) => {
  const [message, setMessage] = useState("");

  const registerUser = async (name, job) => {
    setMessage("Submitting...");

    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({ name, job }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Welcome ${data.name || name}! Redirecting...`);

        // ✅ Save user to localStorage (simulate login)
        localStorage.setItem("user", JSON.stringify({ id: data.id, name, job }));

        // ✅ Navigate after a short delay
        setTimeout(() => navigate("/list"), 1000);
      } else {
        setMessage(`❌ Error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return { registerUser, message };
};
