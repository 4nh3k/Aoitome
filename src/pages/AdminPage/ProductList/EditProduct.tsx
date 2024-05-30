import { useMutation, useQuery } from "@tanstack/react-query";
import HorizontalSeparator from "../../../assets/icon/horizontal-separator.svg";
import CustomButton from "../../../components/AdminComponents/CustomButton/CustomButton";
import AdminInput from "../../../components/AdminComponents/Input/AdminInput";
import AdminTextArea from "../../../components/AdminComponents/Input/AdminTextArea";
import { useCallback, useEffect, useState } from "react";
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
import EditProductItem from "./EditProductItem";
import productApi from "@/apis/product.api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { path } from "@/constants/path";
const BRACELET_CATEGORY_ID = 'e2bff60d-a1d3-49e3-bb34-1a3dde1d7a46'

const EditProduct = () => {

  const { id } = useParams();

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
  const [productItems, setProductItems] = useState<CreateProductItemDTO[]>([]);

  const { data: productData, isLoading: isLoadingProduct } = useQuery(
    {
      queryKey: ['product', id],
      queryFn: () => {
        return productApi.getProductById(id);
      }
    }
  );

  useEffect(() => {
    if (isLoadingProduct || isLoadingCategory || !productData || !categoryData) return;
    const categoryList = categoryData.data.result?.data;
    const product = productData.data;
    setCategories(categoryList);
    setProduct({
      name: product.name,
      catalogId: product.catalogId,
      items: product.items,
      averageRating: product.averageRating,
      ratingCount: product.ratingCount
    });
    setProductItems(product.items);
  }, [productData, isLoadingProduct, categoryData, isLoadingCategory]);

  const productItemHeaders = [
    { label: "Image", prop: "image", isImage: true },
    { label: "Description", prop: "description" },
    { label: "Price", prop: "price" },
    { label: "Discount price", prop: "discountPrice" },
    { label: "Discount percent", prop: "discountPercentage" },
    { label: "Tags", prop: "tags", className: "w-screen" },
  ]

  useEffect(() => {
    console.log("update create product payload");
    setProduct({ ...product, ['items']: productItems })
  }, [productItems]);

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

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddItem = () => {
    setOpenAddModal(true);
  };

  const onAddProductItem = (productItem: CreateProductItemDTO) => {
    setProductItems((prevItems) => [...prevItems, productItem]);
  }

  const [selectedRow, setSelectedRow] = useState();
  const [toggleRowClick, setToggleRowClick] = useState<boolean>(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditDeleteItem = (item: Data, index: number) => {
    console.log('A row has been selected for update / delete')
    console.log(item);
    setSelectedRow(item);
    setToggleRowClick(!toggleRowClick)
  }
  useEffect(() => {
    setOpenEditModal(true);
  }, [selectedRow, toggleRowClick])

  const onEditProductItem = (updatedProductItem: CreateProductItemDTO) => {
    setProductItems((prevItems) =>
      prevItems.map((item) =>
        item.description === updatedProductItem.description ? updatedProductItem : item
      )
    );
  }

  const onDeleteProductItem = (productItem: CreateProductItemDTO) => {
    setProductItems((prevItems) =>
      prevItems.filter((item) => item.description !== productItem.description)
    );
  }

  useEffect(() => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    console.log(productItems);
  }, [productItems])

  const updateProductMutation = useMutation({
    mutationKey: ['add-product', product],
    mutationFn: async (product: CreateNewProductDto) => {
      const result = await productApi.updateProduct(product);
      if (result.status !== 200) {
        toast.error(result.statusText);
        return;
      }

      toast.success("Product has been updated");
    }
  });

  const handleUpdateProduct = useCallback(async () => {
    try {
      await updateProductMutation.mutateAsync(product);
    } catch (error) {
      toast.error("Error uploading image and updating user profile: " + error);
    }
  }, [updateProductMutation]);

  const handleCancelUpdate = (e) => {
    if (isLoadingProduct || isLoadingCategory || !productData || !categoryData) return;
    const categoryList = categoryData.data.result?.data;
    const product = productData.data;
    setCategories(categoryList);
    setProduct({
      name: product.name,
      catalogId: product.catalogId,
      items: product.items,
      averageRating: product.averageRating,
      ratingCount: product.ratingCount
    });
    setProductItems(product.items);
  }

  const navigate = useNavigate();

  const deleteBookMutation = useMutation({
    mutationKey: ['product', 'delete', id],
    mutationFn: async(id: string)=> {
      if (id === null || id === undefined){
        toast.error("product id is not valid");
        return;
      }
      
      console.log(`Prepare to delete product with ${id}`)
      const result = await productApi.deleteProduct(id);
      if (result.status !== 200){
        toast.error(result.data.result);
        return;
      } 
    },
    onSuccess: () => {
      toast.success(`The product with product id: ${id} has been successfully deleted`);
      console.log("Began navigating back to product grid page");
      navigate("../" + path.adminProducts, {replace: true})
    }
  });

  const handleDeleteProduct = useCallback(async () => {
    try {
      await deleteBookMutation.mutateAsync(id);
    } catch (error) {
      toast.error("Error uploading image and updating user profile: " + error);
    }
  }, [deleteBookMutation])

  

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
                value={categories?.find(c => c.id === product?.catalogId)?.name}
                onChange={onDropdownChange} />
            </div>
            <div className="flex flex-col pt-10 pb-96 px-0 justify-between items-start gap-5 rounded-2xl  border-gray-300 bg-white w-full">
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
                <CustomTable headers={productItemHeaders} data={productItems} onRowClick={handleEditDeleteItem} />
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

              <Modal
                size={'6xl'}
                dismissible
                show={openEditModal}
                onClose={() => setOpenEditModal(false)}
              >
                <Modal.Header>Add new product item</Modal.Header>
                <Modal.Body>
                  <EditProductItem product={selectedRow} onEditProductItem={onEditProductItem} onDeleteProductItem={onDeleteProductItem} />
                </Modal.Body>
              </Modal>
            </div>
            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <div className="flex items-start justify-end gap-3 mt-10 self-stretch w-full">
                <CustomButton
                  onClick={handleUpdateProduct}
                  label={"Save product"}
                  textColor={"white"}
                  btnColor={"primary"}
                />

                <CustomButton
                  onClick={handleDeleteProduct}
                  label={"Delete product"}
                  textColor={"white"}
                  btnColor={"secondary"}
                />

                <CustomButton
                  onClick={handleCancelUpdate}
                  label={"Cancel"}
                  textColor={"gray-500"}
                  btnColor={"white"}
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default EditProduct;
