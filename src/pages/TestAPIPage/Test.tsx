import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import { bookReviewApi } from "../../apis/bookReview.api";
import { formatsApi } from "../../apis/format.api";
import { genresApi } from "../../apis/genres.api";
import { publisherApi } from "../../apis/publisher.api";
import Format from "../../types/Models/BookCatalog/Format.type";

export function Test() {
  const getBooksReviewQuery = useQuery({
    queryKey: ["booksReview", 1, 0, 10],
    queryFn: async () => {
      const data = await bookReviewApi.getBookReviewByBook(1, 0, 10);
      return data.data;
    },
  });
  const getBookReviewByUserQuery = useQuery({
    queryKey: [
      "booksReviewUser",
      "44499dcc-259b-4bf8-9f3e-208c1590b8fd",
      0,
      10,
    ],
    queryFn: async () => {
      const data = await bookReviewApi.getBookReviewByUser(
        "44499dcc-259b-4bf8-9f3e-208c1590b8fd",
        0,
        10
      );
      return data.data;
    },
  });
  const createBookReviewMutation = useMutation({
    mutationFn: async (review: BookReviewDTO) => {
      const data = await bookReviewApi.createBookReview(review);
      return data.data;
    },
  });
  const updateBookReviewMutation = useMutation({
    mutationKey: ["updateBookReview", 1],
    mutationFn: async (review: BookReviewDTO) => {
      const data = await bookReviewApi.updateBookReview(review);
      return data.data;
    },
  });
  const deleteBookReviewMutation = useMutation({
    mutationKey: ["deleteBookReview", 1],
    mutationFn: async (data: { userId: string; bookId: number }) => {
      const res = await bookReviewApi.deleteBookReview(
        data.userId,
        data.bookId
      );
      return res.data;
    },
  });

  const getFormatsQuery = useQuery({
    queryKey: ["formats"],
    queryFn: async () => {
      const data = await formatsApi.getFormatByPages(0, 10);
      return data.data;
    },
  });
  const createFormatMutation = useMutation({
    mutationFn: async (name: string) => {
      const data = await formatsApi.createFormat(name);
      return data.data;
    },
  });
  const updateFormatMutation = useMutation({
    mutationKey: ["updateFormat", 1],
    mutationFn: async (format: Format) => {
      const data = await formatsApi.updateFormat(format);
      return data.data;
    },
  });
  const deleteFormatMutation = useMutation({
    mutationKey: ["deleteFormat", 11],
    mutationFn: async (id: number) => {
      const res = await formatsApi.deleteFormat(id);
      return res.data;
    },
  });

  const getGenresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const data = await genresApi.getGenresByPage(0, 10);
      return data.data;
    },
  });
  const getPublisherQuery = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const data = await publisherApi.getPublisherByPages(0, 10);
      return data.data;
    },
  });

  return (
    <>
      <Button
        onClick={() => {
          createFormatMutation.mutate("Test");
          updateFormatMutation.mutate({ id: 12, name: "Test2" });
          deleteFormatMutation.mutate(11);
        }}
      >
        Test
      </Button>
    </>
  );
}
