import { useState, useEffect } from "react";
import axios from "axios";

export default function useUsers(initialPage = 1) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://reqres.in/api/users?page=${initialPage}`, {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [initialPage]);

  return { users, totalPages, loading, error };
}
