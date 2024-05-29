import { useQuery } from "@tanstack/react-query";
import HorizontalSeparator from "../../../assets/icon/horizontal-separator.svg";
import CustomButton from "../../../components/AdminComponents/CustomButton/CustomButton";
import AdminInput from "../../../components/AdminComponents/Input/AdminInput";
import AdminTextArea from "../../../components/AdminComponents/Input/AdminTextArea";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import catalogApi from "@/apis/catalog.api";
import { GetCatalogResponseDTO } from "@/types/Categories/GetCatalogResponseDTO.type";
import { CreateNewProductDto } from "@/types/Products/CreateNewProductDto.type";
import AdminDropdown from "@/components/AdminComponents/Input/AdminDropdown";
import { CreateProductItemDTO } from "@/types/ProductItems/CreateNewProductDto.type";
import CustomTable from "@/components/CustomTable";
import Plus from "@/assets/icon/plus-outline.svg"
import DropzoneFileInput from "@/components/AdminComponents/Input/DropzoneFileInput";
import AddProductItem from "./AddProductItem";
import { Modal } from "flowbite-react";
const BRACELET_CATEGORY_ID = 'e2bff60d-a1d3-49e3-bb34-1a3dde1d7a46'

const AddProduct = () => {

  const [categories, setCategories] = useState<GetCatalogResponseDTO[]>();

  const { data: categoryData, isLoading: isLoadingCategory } = useQuery(
    {
      queryKey: ['categories'],
      queryFn: () => {
        return catalogApi.getCategories();
      }
    }
  );

  const [product, setProduct] = useState<CreateNewProductDto>();

  useEffect(() => {
    if (isLoadingCategory || !categoryData) return;
    const categoryList = categoryData.data.result?.data;
    setCategories(categoryList);
    setProduct({
      name: '',
      catalogId: BRACELET_CATEGORY_ID,
      ratingCount: 0,
      averageRating: 0,
      items: []
    })
  }, [categoryData, isLoadingCategory]);

  const productItemHeaders = [
    { label: "Image", prop: "image", isImage: true },
    { label: "Description", prop: "description" },
    { label: "Price", prop: "price" },
    { label: "Discount price", prop: "discountPrice" },
    { label: "Discount percent", prop: "discountPercentage" },
    { label: "Tags", prop: "tags", className: "w-screen" },
  ]

  const [productItems, setProductItems] = useState<CreateProductItemDTO[]>([]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the value is a number and convert if necessary
    const parsedValue = isNaN(value) || value.trim() === '' ? value : parseFloat(value);
    setProduct({ ...product, [name]: parsedValue })
    console.log(product);
  };

  const onDropdownChange = (e, key: number) => {
    const { name } = e.target;
    setProduct({ ...product, [name]: key })
    console.log(product);
  }

  const onAddProductItem = (productItem: CreateProductItemDTO) => {
    setProductItems((prevItems) => [...prevItems, productItem]);
  }

  useEffect(() => {
    setOpenAddModal(false);
    console.log(productItems);
  }, [productItems])

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddItem = () => {
    setOpenAddModal(true);
  };

  // const createProductMutation = useMutation({
  //   mutationKey: ['add-product', book],
  //   mutationFn: async(book: CreateBookDTO) => {
  //     const result = await bookApi.createBook(book);
  //     if (result.status !== 200) {
  //       toast.error(result.statusText);
  //       return;
  //     }

  //     toast.success("Product has been created");
  //   }
  // });

  // const handleCreateBook = useCallback(async () => {
  //   try {
  //     await createImageUrlMutation.mutateAsync(file);
  //     toast.success("Image uploaded and user profile updated successfully.");
  //   } catch (error) {
  //     toast.error("Error uploading image and updating user profile: " + error);
  //   }
  // }, [createImageUrlMutation, createProductMutation]);

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 h-full min-h-screen gap-6 rounded-lg shadow-sm">
      <Fade triggerOnce={true}>
        <div className="flex items-stretch basis-full gap-4">
          <div className="flex flex-col pt-4 pb-5 px-4 justify-between items-start gap-5 rounded-2xl border-1 border-solid border-gray-300 bg-white w-full">
            <span className="heading-4">Add product</span>
            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <AdminInput
                title={"Name"}
                placeholder={"Enter product name"}
                onChange={onInputChange}
                type={"text"}
                name={"name"}
                value={product?.name} />

              <AdminDropdown
                title="Product category"
                items={categories !== undefined ? categories.map(c => ({ key: c.id, value: c.name })) : []}
                name='catalogId'
                onChange={onDropdownChange} />
            </div>
            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">

              <div className="flex items-start justify-end gap-3 mt-10 self-stretch w-full">
                <CustomButton
                  // onClick={handleCreateBook}
                  label={"Add product"}
                  textColor={"white"}
                  btnColor={"primary"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-stretch basis-full gap-4">
          <div className="flex flex-col pt-4 pb-5 px-4 justify-between items-start gap-5 rounded-2xl border-1 border-solid border-gray-300 bg-white w-full">
            <div className="flex w-full flex-wrap items-stretch self-stretch justify-between gap-8">
              <span className="heading-4">Product items</span>
              <CustomButton
                onClick={handleAddItem}
                imgSrc={Plus}
                label={"Add item"}
                textColor={"white"}
                btnColor={"primary"}
              />
            </div>
            <div className="flex w-full flex-wrap items-stretch self-stretch justify-stretch gap-8">
              <CustomTable headers={productItemHeaders} data={productItems} />
            </div>

            <Modal
              size={'6xl'}
              dismissible
              show={openAddModal}
              onClose={() => setOpenAddModal(false)}
            >
              <Modal.Header>Add new product item</Modal.Header>
              <Modal.Body>
                <AddProductItem onAddProductItem={onAddProductItem} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default AddProduct;
