import { useCallback, useEffect, useState } from "react";
import { getReviews } from "../data/api";

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, refetch: fetchReviews };
}
