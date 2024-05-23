import { useMutation, useQuery } from "@tanstack/react-query";
import HorizontalSeparator from "../../../assets/icon/horizontal-separator.svg";
import CustomButton from "../../../components/AdminComponents/CustomButton/CustomButton";
import AdminDropdown from "../../../components/AdminComponents/Input/AdminDropdown";
import AdminInput from "../../../components/AdminComponents/Input/AdminInput";
import AdminTextArea from "../../../components/AdminComponents/Input/AdminTextArea";
import DatepickerInput from "../../../components/AdminComponents/Input/DatepickerInput";
import DropzoneFileInput from "../../../components/AdminComponents/Input/DropzoneFileInput";
import GenresInput from "../../../components/AdminComponents/Input/GenresInput";
import { bookApi } from "../../../apis/book.api";
import { publisherApi } from "../../../apis/publisher.api";
import { formatsApi } from "../../../apis/format.api";
import { useCallback, useEffect, useState } from "react";
import authApi from "../../../apis/auth.api";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BookDetailDTO } from "../../../types/DTOs/BookCatalog/BookDetailDTO.type";
import { redirect } from "react-router-dom";
import { path } from "../../../constants/path";

const EditBook = () => {
  const { id } = useParams();
  const [file, setFile] = useState<File>();
  const [imgSrc, setImgSrc] = useState<string>();
  const [book, setBook] = useState<BookDetailDTO>();

  const { data: bookData, isLoading: isLoadingBookData } = useQuery(
    {
      queryKey: ['book', id],
      queryFn: () => {
        return bookApi.getBook(id);
      }
    }
  ); 

  const { data: langData, isLoading: isLoadingLang } = useQuery(
    {
      queryKey: ['lang-codes'],
      queryFn: () => {
        return bookApi.getAllLanguageCodes();
      }
    }
  );

  const { data: publishersData, isLoading: isLoadingPublishers } = useQuery(
    {
      queryKey: ['admin', 'publishers'],
      queryFn: () => {
        return publisherApi.getPublisherByPages(0, 100);
      }
    }
  );

  const { data: formatData, isLoading: isLoadingFormat } = useQuery(
    {
      queryKey: ['admin', 'format'],
      queryFn: () => {
        return formatsApi.getFormatByPages(0, 100);
      }
    }
  );

  const languageCodes = langData?.data;
  const publishers = publishersData?.data.data;
  const formats = formatData?.data.data;

  useEffect(() => {
    if (!isLoadingBookData && !isLoadingFormat && !isLoadingPublishers && !isLoadingLang && bookData){
      const book = bookData.data;
      setBook(book);
      const dimensionList = book.dimensions.split(' x ');
      console.log(book);
      console.log(dimensionList)
      setDimension({
        x: parseFloat(dimensionList[0]),
        y: parseFloat(dimensionList[1]),
        z: parseFloat(dimensionList[2])
      });
      setImgSrc(book.imageUrl)
    }
  }, [isLoadingBookData, bookData, isLoadingFormat, isLoadingLang, isLoadingPublishers]);

  const [dimensions, setDimension] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the value is a number and convert if necessary
    const parsedValue = isNaN(value) || value.trim() === '' ? value : parseFloat(value);
    setBook({ ...book, [name]: parsedValue })
    console.log(book);
  };

  const onDimensionChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(value) || value.trim() === '' ? value : parseFloat(value);
    setDimension({ ...dimensions, [name]: parsedValue })
  }

  useEffect(() => {
    setBook((prevBook) => ({
      ...prevBook,
      dimensions: `${dimensions.x} x ${dimensions.y} x ${dimensions.z} inches`,
      imageUrl: imgSrc
      
    }));
  }, [dimensions]);

  const onDropdownChange = (e, key: number) => {
    const { name } = e.target;
    setBook({ ...book, [name]: key });
  }

  const onPublicationDateChange = (date: Date) => {
    setBook({
      ...book,
      ['publicationDay']: date.getDate(), ['publicationMonth']: date.getMonth() + 1, ['publicationYear']: date.getFullYear()
    })
  }

  const onGenreListChange = (genres: Genre[]) => {
    setBook({
      ...book,
      ['bookGenres']: genres
    });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith('image/')) {
        // Update the image source with the selected file
        const newImageSrc = URL.createObjectURL(file);
        setImgSrc(newImageSrc);
        setFile(file);
      } else {
        console.error('Invalid file format. Please select an image.');
      }
    }
  };

  useEffect(() => {
    console.log(book);
  }, [book]);

  const navigate = useNavigate();

  const deleteBookMutation = useMutation({
    mutationKey: ['book', 'delete', book?.id],
    mutationFn: async(id: number)=> {
      if (id === null || id === undefined){
        toast.error("Book id is not valid");
        return;
      }
      
      console.log(`Prepare to delete book with ${book.id}`)
      const result = await bookApi.deleteBook(id);
      if (result.status !== 200){
        toast.error(result.data);
        return;
      } 
    },
    onSuccess: () => {
      toast.success(`The book with bookId: ${id} has successfully deleted`);
      console.log("Began navigating back to book grid page");
      navigate("../" + path.adminProducts, {replace: true})
    }
  });

  const createImageUrlMutation = useMutation({
    mutationKey: ['image', file],
    mutationFn: async (file: File) => {
      if (file === undefined || file === null) {
        return imgSrc;
      }
      console.log("Began uploading image");
      const url = await authApi.uploadImage({ image: file });
      console.log("Image url generated: " + url.data.imageUrls[0]);
      setImgSrc(url.data.imageUrls[0]);
      return url.data.imageUrls[0]; // Return the image URL
    },
    onSuccess: (imageUrl) => {
      // Trigger the second mutation after successfully uploading the image
      toast.success("Save new image successfully");
      const updateBook = book;
      updateBook.imageUrl = imageUrl;
      console.log("Update book")
      console.log(updateBook)
      setBook({ ...book, ['imageUrl']: imageUrl[0] });
      updateProductMutation.mutate(updateBook);
    }
  });

  const updateProductMutation = useMutation({
    mutationKey: ['update-product', book],
    mutationFn: async(book: BookDetailDTO) => {
      console.log("Update book prepare...: " + book)
      const result = await bookApi.updateBook(book);
      if (result.status !== 200) {
        toast.error(result.statusText);
        return;
      }      
    },
    onSuccess: () => {
      toast.success("Product has been updated");
    }
  });

  const handleUpdateBook = useCallback(async () => {
    try {
      await createImageUrlMutation.mutateAsync(file);
    } catch (error) {
      toast.error("Error uploading image and updating user profile: " + error);
    }
  }, [createImageUrlMutation, updateProductMutation]);

  const handleDeleteBook = useCallback(async () => {
    try {
      const bookId = book?.id;
      await deleteBookMutation.mutateAsync(bookId);
    } catch (error) {
      toast.error("Error uploading image and updating user profile: " + error);
    }
  }, [deleteBookMutation])

  const handleCancel = (e) => {
    const book = bookData?.data;
    setBook(book);
  };

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <div className="flex items-stretch basis-full gap-4">
        <div className="flex flex-col pt-4 pb-5 px-4 justify-between items-start gap-5 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <span className="heading-4">Book detail</span>
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Title"} placeholder={"Enter title"} onChange={onInputChange} type={"text"} name={"title"} value={book?.title} />
            <AdminInput
              title={"Title without series"}
              placeholder={"Enter title without series"}
              onChange={onInputChange} type={"text"} name={"titleWithoutSeries"} value={book?.titleWithoutSeries} />
          </div>
          <div className="flex w-full flex-wrap items-stretch justify-between">
            <AdminInput title={"Discount percentage"} placeholder={"50"} onChange={onInputChange} type={"number"} name={"discountPercentage"} value={book?.discountPercentage} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between">
            <AdminTextArea
              title={"Description"}
              name="description"
              value={book?.description}
              placeholder={"Enter description here"}
              onChange={onInputChange}
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Number of pages"}
              placeholder={"300"} onChange={onInputChange} type={"number"} name={"numPages"} value={book?.numPages} />
            <AdminInput title={"Author"} placeholder={"Rapi Redhood"} onChange={onInputChange} type={"text"} name={"authorName"} value={book?.authorName} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <DatepickerInput value={`${book?.publicationDay}-${book?.publicationMonth}-${book?.publicationYear}`} onChange={onPublicationDateChange} title="Publication date" />
            {!isLoadingLang && <AdminDropdown title="Language code" items={languageCodes !== undefined ? languageCodes.map(l => ({ key: l, value: l })) : []} name='languageCode' onChange={onDropdownChange} value={book?.languageCode}/>}
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Price"} placeholder={"$4.99"} onChange={onInputChange} type={"number"} name={"price"} value={book?.price} />
            <AdminInput title={"Availability"} placeholder={"100"} onChange={onInputChange} type={"number"} name={"availability"} value={book?.availability} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
              <div className="flex flex-start gap-2 self-stretch">
                <div className="flex items-center gap-[1.5rem] flex-1 self-stretch">
                  <span className="text-sm font-medium leading-5">Dimensions</span>
                </div>
              </div>
              <div className="flex justify-between gap-6 items-center self-stretch">
                <div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
                  <input type='number' name="x" value={dimensions.x} className="bg-gray-50 flex text-sm w-[52.5px] font-normal leading-5 outline-none focus-outline-none focus-border-none focus-outline border-transparent focus:border-transparent focus:ring-0 p-0" placeholder="2.2" onChange={onDimensionChange} onKeyPress={(e) => {
                    if (e.key === '-') {
                      e.preventDefault();
                    }
                  }}></input>
                </div>
                <span className="text-sm font-medium leading-4">x</span>
                <div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
                  <input type='number' name="y" value={dimensions.y} className="w-[52.5px] bg-gray-50 flex  text-sm font-normal leading-5 outline-none focus-outline-none focus-border-none focus-outline border-transparent focus:border-transparent focus:ring-0 p-0 " placeholder="2.2" onChange={onDimensionChange} onKeyPress={(e) => {
                    if (e.key === '-') {
                      e.preventDefault();
                    }
                  }}></input>
                </div>
                <span className="text-sm font-medium leading-4">x</span>
                <div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
                  <input type="number" name="z" value={dimensions.z} className="bg-gray-50 flex  text-sm w-[52.5px] font-normal leading-5 outline-none focus-outline-none focus-border-none focus-outline border-transparent focus:border-transparent focus:ring-0 p-0" placeholder="2.2" onChange={onDimensionChange} onKeyPress={(e) => {
                    if (e.key === '-') {
                      e.preventDefault();
                    }
                  }}></input>
                </div>
                <span className="text-sm font-medium leading-4">inches</span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
              <span className="text-sm font-medium leading-5">{"Item weight"}</span>
              <div className="flex flex-1 items-center self-stretch align-middle gap-4">
                <div className="flex flex-1 px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
                  <input type={"number"} name={"itemWeight"} class="bg-gray-50 flex flex-1 text-sm font-normal leading-5 outline-none focus-outline-none focus-border-none focus-outline border-transparent focus:border-transparent focus:ring-0 p-0" value={book?.itemWeight} placeholder={"2.41"} onChange={onInputChange} />
                </div>
                <span className="text-sm font-medium leading-4 align-middle">pounds</span>
              </div>

            </div>
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            {!isLoadingPublishers && publishers && <AdminDropdown title="Publishers" items={publishers !== undefined ? publishers?.map(p => ({ key: p.id, value: p.name })) : []} onChange={onDropdownChange} name={"publisherId"} value={publishers.filter(p => p.id === book?.publisherId).map(p => p.name)} />}

            {!isLoadingFormat && <AdminDropdown title="Format" items={formats !== undefined ? formats?.map(f => ({ key: f.id, value: f.name })) : []} onChange={onDropdownChange} name={"formatId"} value={formats.filter(f => f.id === book?.formatId).map(f => f.name)}/>}
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <GenresInput onChange={onGenreListChange} selectedGenres={book?.bookGenres !== undefined ? book.bookGenres : []} />
          </div>
          <img src={HorizontalSeparator} className="w-full" />
          <div className="flex items-start justify-end gap-3 self-stretch w-full">
           <CustomButton
              label={"Save changes"}
              textColor={"white"}
              btnColor={"primary"}
              onClick={handleUpdateBook}
            />
            <CustomButton
              label={"Delete book"}
              textColor={"white"}
              btnColor={"secondary"}
              onClick={handleDeleteBook}
            />
            <CustomButton
              label={"Cancel"}
              textColor={"black"}
              btnColor={"white"}
              borderColor={"gray-300"}
              onClick={handleCancel}
            />
          </div>
        </div>
        <div className="flex w-2/5 self-stretch p-4 flex-col gap-6 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <img src={imgSrc} className="w-auto h-auto flex aspect-square rounded-lg bg-gray-50 object-cover"></img>
          <span className="heading-5">Upload image</span>
          <DropzoneFileInput onChange={handleFileChange} />
          <div className="flex flex-col items-start gap-3 self-stretch">
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
