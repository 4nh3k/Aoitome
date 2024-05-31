import userApi from '@/apis/user.api'
import CustomButton from '@/components/AdminComponents/CustomButton/CustomButton'
import AdminInput from '@/components/AdminComponents/Input/AdminInput'
import AdminTextArea from '@/components/AdminComponents/Input/AdminTextArea'
import DropzoneFileInput from '@/components/AdminComponents/Input/DropzoneFileInput'
import { CreateProductItemDTO } from '@/types/ProductItems/CreateNewProductDto.type'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const EditProductItem = ({product, onEditProductItem, onDeleteProductItem }) => {

  console.log(product);
  const [productItem, setProductItem] = useState<CreateProductItemDTO>(product);
  useEffect(() => {
    setImgSrc(product.image)
  }, [])

  const onInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the value is a number and convert if necessary
    const parsedValue = isNaN(value) || value.trim() === '' ? value : parseFloat(value);
    setProductItem({ ...productItem, [name]: parsedValue })
    console.log(productItem);
  };

  const [file, setFile] = useState<File>();
  const [imgSrc, setImgSrc] = useState<string>();

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

  const handleEditProductItem = (e) => {
    createImageUrlMutation.mutate(file);
  }

  const handleDeleteProductItem = (e) => {
    onDeleteProductItem(productItem);
    setProductItem(undefined);
  }

  useEffect(() => {
    console.log("use effect ran")
    if (productItem && productItem.price !== undefined && productItem.discountPercentage !== undefined) {
      console.log("update discount begin")
      const discountPrice = productItem.price * productItem.discountPercentage / 100;
      if (productItem.discountPrice !== discountPrice) {
        setProductItem({ ...productItem, ['discountPrice']: discountPrice })
        console.log('update discount price');
      }
    }
  }, [productItem]);

  const createImageUrlMutation = useMutation({
    mutationKey: ['image', file],
    mutationFn: async (file: File) => {
      if (file === undefined || file === null) {
        return imgSrc;
      }
      console.log("Began uploading image");
      const url = await userApi.uploadImg(file);
      console.log("Image url generated: " + url.data.result);
      setImgSrc(url.data.result);
      return url.data.result; // Return the image URL
    },
    onSuccess: (imageUrl) => {
      // Trigger the second mutation after successfully uploading the image
      toast.success("Save image successfully");

      const updateProductItem = productItem;
      updateProductItem.image = imageUrl;
      console.log("Updating product item...")
      console.log(updateProductItem)
      onEditProductItem(updateProductItem);
      setProductItem(undefined);
    }
  });

  return (
    <div className="flex pt-8 pb-8 px-6 justify-between items-start gap-10 rounded-2xl border-1 border-solid border-gray-300 bg-white w-full">
      <div className="flex flex-col w-2/5 flex-wrap items-start self-stretch justify-between gap-8">
        <img src={imgSrc} className="w-full h-56 flex aspect-square rounded-lg bg-gray-50 object-cover"></img>
        <DropzoneFileInput
          onChange={handleFileChange}
        />
      </div>

      <div className="flex flex-col w-7/12 flex-wrap items-start justify-between self-stretch gap-8">
        <div className="flex w-full flex-wrap items-stretch self-stretch justify-stretch gap-8">
          <AdminInput
            title={"Price"}
            placeholder={"$4.99"}
            onChange={onInputChange}
            type={"number"}
            name={"price"}
            value={productItem?.price}
          />
          <AdminInput
            title={"Discount percent"}
            placeholder={"50"}
            onChange={onInputChange}
            type={"number"}
            name={"discountPercentage"}
            value={productItem?.discountPercentage}
          />
        </div>
        <div className="flex w-full flex-wrap items-stretch justify-between">
          <AdminTextArea
            title={"Description"}
            name="description"
            value={productItem?.description}
            placeholder={"Enter description here"}
            onChange={onInputChange}
          />
        </div>

        <div className="flex w-full flex-wrap items-stretch self-stretch justify-stretch gap-8">
          <AdminInput
            title={"Tags"}
            placeholder={"Enter tags"}
            onChange={onInputChange}
            type={"text"}
            name={"tags"}
            value={productItem?.tags}
          />
        </div>
        <div className="flex w-full flex-wrap items-stretch self-stretch justify-end gap-8">
          <CustomButton
            onClick={handleEditProductItem}
            label={"Update"}
            textColor={"white"}
            btnColor={"primary"}
          />
          <CustomButton
            onClick={handleDeleteProductItem}
            label={"Delete"}
            textColor={"white"}
            btnColor={"secondary"}
          />
        </div>
      </div>
    </div>
  )
}

export default EditProductItem