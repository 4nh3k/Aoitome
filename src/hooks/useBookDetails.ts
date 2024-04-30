import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../apis/book.api";

const useBookDetails = (id: string) => {
  const getBookDetails = useQuery({
    queryKey: ["books", id],
    queryFn: async () => {
      const res = await bookApi.getBook(id);
      return res.data;
    },
  });

  return {
    getBookDetails,
  };
};

export default useBookDetails;
