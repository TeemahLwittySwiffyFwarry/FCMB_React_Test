import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsePaginatedUsersReturn {
  users: User[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * ✅ Secure and stable hook to fetch paginated users with clear error handling
 */
export const usePaginatedUsers = (): UsePaginatedUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    const controller = new AbortController(); // ✅ modern cancellation
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`https://reqres.in/api/users`, {
        params: { page },
        signal: controller.signal,
        timeout: 10000,
        headers: { "Content-Type": "application/json" },
      });

      // Simulate slight delay for smooth loader transition
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (res.status === 200 && res.data?.data) {
        setUsers(res.data.data);
        setTotalPages(res.data.total_pages ?? 1);
      } else {
        setError("Unexpected response format.");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.code === "ECONNABORTED") {
        setError("Request timed out. Please check your connection.");
      } else if (axiosError.response) {
        const status = axiosError.response.status;
        if (status === 404) setError("User data not found.");
        else if (status >= 500)
          setError("Server is temporarily unavailable. Try again later.");
        else setError("Failed to fetch user data.");
      } else if (axiosError.request) {
        setError("No response received. Please check your network.");
      } else {
        setError("An unexpected error occurred.");
      }

      console.error("Error fetching users:", axiosError);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    const cleanup = fetchUsers();
    return () => {
      if (cleanup instanceof Function) cleanup();
    };
  }, [fetchUsers]);

  return { users, totalPages, loading, error, page, setPage };
};
