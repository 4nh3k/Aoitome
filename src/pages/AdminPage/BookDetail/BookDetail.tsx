import HorizontalSeparator from "@/assets/icon/horizontal-separator.svg";
import CustomButton from "@/components/AdminComponents/CustomButton/CustomButton";
import FileLoadProgressBar from "@/components/AdminComponents/FileLoadProgressBar/FileLoadProgressBar";
import AdminDropdown from "@/components/AdminComponents/Input/AdminDropdown";
import AdminInput from "@/components/AdminComponents/Input/AdminInput";
import AdminTextArea from "@/components/AdminComponents/Input/AdminTextArea";
import DatepickerInput from "@/components/AdminComponents/Input/DatepickerInput";
import DimensionInput from "@/components/AdminComponents/Input/DimensionInput";
import DropzoneFileInput from "@/components/AdminComponents/Input/DropzoneFileInput";
import GenresInput from "@/components/AdminComponents/Input/GenresInput";

const BookDetail = () => {
  const languageCodes = ["en", "jpn", "vn"];
  const publishers = ["Lorem Ipsum"];
  const formats = ["Hardcover", "Paperback"];

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <div className="flex items-stretch justify-between gap-4">
        <div className="flex flex-col pt-4 pb-5 px-4 justify-between items-start gap-5 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <span className="heading-4">Book detail</span>
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Title"} placeholder={"Enter title"} />
            <AdminInput
              title={"Title without series"}
              placeholder={"Enter title without series"}
            />
          </div>
          <div className="flex w-full flex-wrap items-stretch justify-between">
            <AdminInput title={"Discount percentage"} placeholder={"50%"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between">
            <AdminTextArea
              title={"Description"}
              placeholder={"Enter description here"}
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Number of pages"} placeholder={"300"} />
            <AdminInput title={"Author"} placeholder={"Rapi Redhood"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <DatepickerInput title="Publication date" />
            <AdminDropdown title="Language code" items={languageCodes} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Price"} placeholder={"$4.99"} />
            <AdminInput title={"Availability"} placeholder={"100"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch basis-1/2 justify-between gap-4">
            <DimensionInput />
            <AdminInput title={"Item weight"} placeholder={"2.41"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Average rating"} placeholder={"7.0"} />
            <AdminInput title={"Rating count"} placeholder={"1000"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminDropdown title="Publishers" items={publishers} />
            <AdminDropdown title="Format" items={formats} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <GenresInput />
          </div>
          <img src={HorizontalSeparator} className="w-full" />
          <div className="flex items-start justify-end gap-3 self-stretch w-full">
            <CustomButton
              label={"Add book"}
              textColor={"white"}
              btnColor={"primary"}
            />
            <CustomButton
              label={"Cancel"}
              textColor={"black"}
              btnColor={"white"}
              borderColor={"gray-300"}
            />
          </div>

          <div className="flex items-start justify-end gap-3 self-stretch w-full">
            <CustomButton
              label={"Save changes"}
              textColor={"white"}
              btnColor={"primary"}
            />
            <CustomButton
              label={"Delete book"}
              textColor={"white"}
              btnColor={"secondary"}
            />
            <CustomButton
              label={"Cancel"}
              textColor={"black"}
              btnColor={"white"}
              borderColor={"gray-300"}
            />
          </div>
        </div>
        <div className="flex w-2/5 self-stretch p-4 flex-col gap-6 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <img className="flex aspect-square self-strech rounded-lg bg-gray-50"></img>
          <span className="heading-5">Book image gallery</span>
          <DropzoneFileInput />
          <div className="flex flex-col items-start gap-3 self-stretch">
            <FileLoadProgressBar />
            <FileLoadProgressBar />
            <FileLoadProgressBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
