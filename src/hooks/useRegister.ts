import { useState } from "react";
import Swal from "sweetalert2";
import { NavigateFunction } from "react-router-dom";

// ✅ Define shape of the user response
interface UserResponse {
  id: string;
  name: string;
  job: string;
  createdAt?: string;
}

// ✅ Define what the hook will return
interface UseRegisterUserReturn {
  registerUser: (name: string, job: string) => Promise<void>;
  message: string;
  isLoading: boolean;
}

// ✅ Custom Hook
export const useRegisterUser = (
  navigate: NavigateFunction
): UseRegisterUserReturn => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerUser = async (name: string, job: string): Promise<void> => {
    setIsLoading(true);
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

      const data: UserResponse = await response.json();

      if (response.ok && data.id) {
        // ✅ Save to localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.id, name: data.name || name, job })
        );

        setMessage(`✅ Welcome ${data.name || name}!`);

        // ✅ SweetAlert success popup
        await Swal.fire({
          title: "Registration Successful 🎉",
          text: `Welcome ${data.name || name}!`,
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#16a34a", // Tailwind green-600
        });

        navigate("/list");
      } else {
        // ❌ SweetAlert error popup
        await Swal.fire({
          title: "Registration Failed ❌",
          text: (data as any).error || "Unknown error occurred",
          icon: "error",
          confirmButtonColor: "#dc2626", // Tailwind red-600
        });
        setMessage("❌ Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      await Swal.fire({
        title: "Network Error 🌐",
        text: "Something went wrong. Please check your connection and try again.",
        icon: "warning",
        confirmButtonColor: "#f59e0b", // amber-500
      });
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, message, isLoading };
};
