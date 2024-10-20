import { addressApi } from "@/apis/address.api";
import authApi from "@/apis/auth.api";
import AdminPassword from "@/components/AdminComponents/Input/AdminPassword";
import { User } from "@/types/Models/Identity/User.type";
import { Address } from "@/types/Models/Ordering/BuyerModel/Address.type";
import { getUIDFromLS } from "@/utils/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Select } from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InfoOutline from "@/assets/icon/info-outline.svg";
import UploadIcon from "@/assets/icon/upload.svg";
import ElysiaImg from "@/assets/img/elysia.jpg";
import CustomButton from "@/components/AdminComponents/CustomButton/CustomButton";
import AdminDropdown from "@/components/AdminComponents/Input/AdminDropdown";
import AdminInput from "@/components/AdminComponents/Input/AdminInput";
import AdminTextArea from "@/components/AdminComponents/Input/AdminTextArea";
import BooleanIcon from "@/components/BooleanIcon/BooleanIcon";

const UserAccount = () => {
  const userId = getUIDFromLS() ?? "";

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const [addressId, setAddressId] = useState<number | undefined>(undefined);

  const [userProfile, setUserProfile] = useState<User>();
  const [currentImg, setCurrentImg] = useState(ElysiaImg);
  const [oldImg, setOldImg] = useState();
  const [file, setFile] = useState<File>();

  const [address, setAddress] = useState<Address>();

  const [passLengthValid, setPassLengthValid] = useState(false);
  const [passHaveUppercase, setPassHaveUppercase] = useState(false);
  const [passContainSpecialChar, setPassContainSpecialChar] = useState(false);
  const [isNewPass, setIsNewPass] = useState(false);
  useEffect(() => {
    setPassLengthValid(newPassword.length < 8 ? false : true);
    setPassHaveUppercase(!/[A-Z]/.test(newPassword) ? false : true);
    setPassContainSpecialChar(!/[!@#$%^&*]/.test(newPassword) ? false : true);
    setIsNewPass(newPassword === currentPassword ? false : true);
  }, [newPassword]);

  const inputRef = useRef(null);
  const client = useQueryClient();

  const handleLoadImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith("image/")) {
        // Update the image source with the selected file
        const newImageSrc = URL.createObjectURL(file);
        setOldImg(currentImg);
        setCurrentImg(newImageSrc);
        setFile(file);
      } else {
        console.error("Invalid file format. Please select an image.");
      }
    }
  };

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => {
      return authApi.getUserProfile(userId);
    },
  });

  useEffect(() => {
    if (!isUserDataLoading && userData) {
      const admin = userData?.data;
      setUserProfile(admin);
      setCurrentImg(admin.profileImageLink);
      console.log(admin);
    }
  }, [isUserDataLoading, userData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleAdressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  const onRemoveImage = (e) => {
    setCurrentImg(userProfile.profileImageLink);
  };

  const onCancelUpdate = (e) => {
    if (!isUserDataLoading && userData) {
      const admin = userData?.data;
      setUserProfile(admin);
      setCurrentImg(admin.profileImageLink);
      console.log(admin);
    }
  };

  const createAddressMutation = useMutation({
    mutationKey: ["create-address", userId],
    mutationFn: async (address: Address) => {
      console.log("Began creating address...");
      await addressApi.createAddress(userId, address);
      client.invalidateQueries(["address", userId]);
    },
  });

  const updateAddressMutation = useMutation({
    mutationKey: ["update-address", addressId],
    mutationFn: async (address: Address) => {
      console.log(addressId);

      console.log("Began updating address...");
      await addressApi.updateAddress(addressId, address);
      client.invalidateQueries(["address", userId ?? ""]);
    },
  });

  const handleCreateAddress = async () => {
    try {
      console.log("data", address);
      if (addressId === undefined) {
        await createAddressMutation.mutateAsync(address);
        toast.success("Address created successfully");
      } else {
        await updateAddressMutation.mutateAsync(address);
        toast.success("Address updated successfully");
      }
    } catch (error) {
      toast.error("Error creating address: " + error);
    }
  };

  const createImageUrlMutation = useMutation({
    mutationKey: ["image", file],
    mutationFn: async (file: File) => {
      if (file === undefined || file === null) {
        return currentImg;
      }
      console.log("Began uploading image");
      const url = await authApi.uploadImage({ image: file });
      console.log("Image url generated: " + url.data.imageUrls[0]);
      setCurrentImg(url.data.imageUrls[0]);
      return url.data.imageUrls[0]; // Return the image URL
    },
    onSuccess: (imageUrl) => {
      // Trigger the second mutation after successfully uploading the image
      toast.success("Save image successfully");
      updateAccountMutation.mutate({
        ...userProfile,
        ["profileImageLink"]: imageUrl,
      });
    },
  });

  const updateAccountMutation = useMutation({
    mutationKey: ["update-account", userProfile?.userName],
    mutationFn: async (userProfile: User) => {
      console.log("Began updating user...");
      setUserProfile({ ...userProfile, ["profileImageLink"]: currentImg });
      console.log(userProfile);
      await authApi.updateUserProfile(userId, userProfile);
    },
  });

  const handleSaveChanges = useCallback(async () => {
    try {
      await createImageUrlMutation.mutateAsync(file);
      toast.success("Image uploaded and user profile updated successfully.");
    } catch (error) {
      toast.error("Error uploading image and updating user profile: " + error);
    }
  }, [createImageUrlMutation, updateAccountMutation]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "currentPassword":
        setCurrentPassword(value);
        return;
      case "newPassword":
        setNewPassword(value);
        return;
      case "repeatNewPassword":
        setRepeatNewPassword(value);
        return;
    }
  };

  const onClickCancelChangePassword = (e) => {
    setCurrentPassword("");
    setNewPassword("");
    setRepeatNewPassword("");
  };

  const updatePasswordMutation = useMutation({
    mutationKey: ["update-password", userId],
    mutationFn: async () => {
      console.log("Current password: " + currentPassword);
      console.log("New password: " + newPassword);
      console.log("Repeat new password :" + repeatNewPassword);

      if (!currentPassword || !newPassword || !repeatNewPassword) {
        toast.error("There is at least one field empty, please try again");
        return;
      }

      if (newPassword !== repeatNewPassword) {
        toast.error(
          "New password and repeat new password not matched, please try again"
        );
        return;
      }
      const updatePassword = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      const result = await authApi.updatePassword(userId, updatePassword);
      if (result.status === 400) {
        toast.error(result.data);
        return;
      }

      toast.success("User's password has been updated");
    },
  });

  const handleUpdateUserPassword = (e) => {
    updatePasswordMutation.mutate();
  };

  const { data: addressData, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["address", userId],
    queryFn: async () => {
      return await addressApi.getAddressByBuyer(userId, 0, 1000);
    },
  });

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <div className="flex items-start basis-full gap-4 ">
        <div className="flex flex-col pt-4 pb-5 px-4 justify-between w-3/4 gap-8 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <div className="flex items-center gap-4">
            <span className="heading-4">Account</span>
            <img src={InfoOutline} width={24} height={24} />
          </div>

          <div className="flex w-[18.75rem] justify-between items-center gap-4">
            <img
              src={currentImg}
              className="flex-shrink-0 rounded-full border-rounded border-rounded h-[4.5rem] w-[4.5rem]"
            />

            <button
              className={`bg-primary flex w-[8rem] h-10 py-[23px] px-4 justify-center items-center gap-3 rounded-xl border-1 border-solid`}
              onClick={handleLoadImage}
            >
              {UploadIcon ? (
                <img src={UploadIcon} width={16} height={16} />
              ) : (
                ""
              )}
              <span
                className={`text-sm text-white font-medium leading-[1.125rem]`}
              >
                Upload
              </span>
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif, image/svg+xml"
              />
            </button>

            <CustomButton
              label={"Remove"}
              textColor={"black"}
              btnColor={"white"}
              onClick={onRemoveImage}
              borderColor="gray-300"
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput
              type="text"
              name={"userName"}
              value={
                userProfile?.userName !== undefined ? userProfile?.userName : ""
              }
              title={"Username*"}
              placeholder={"Enter username"}
              onChange={handleChange}
            />

            <AdminInput
              name={"fullName"}
              value={
                userProfile?.fullName !== undefined ? userProfile?.fullName : ""
              }
              title={"Full name*"}
              placeholder={"Enter full name"}
              onChange={handleChange}
              type={"text"}
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput
              name={"email"}
              value={userProfile?.email !== undefined ? userProfile?.email : ""}
              title={"Your email*"}
              placeholder={"Enter email"}
              onChange={handleChange}
              type={"text"}
            />

            <AdminInput
              title={"Phone number*"}
              placeholder={"(+123) 456 789"}
              onChange={handleChange}
              name={"phoneNumber"}
              value={
                userProfile?.phoneNumber !== undefined
                  ? userProfile?.phoneNumber
                  : ""
              }
              type={"number"}
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput
              title={"Country"}
              placeholder={"Enter country"}
              onChange={handleChange}
              name={"country"}
              value={
                userProfile?.country !== undefined ? userProfile?.country : ""
              }
              type={"text"}
            />
            <AdminInput
              title={"City"}
              placeholder={"Enter city"}
              onChange={handleChange}
              name={"city"}
              value={userProfile?.city !== undefined ? userProfile?.city : ""}
              type={"text"}
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            {/* <AdminDropdown title='Timezone' items={timezones} /> */}
            <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
              <span className="text-sm font-medium leading-5">Role</span>
              <Select
                className="self-strech w-full"
                required
                value={"User"}
                disabled={true}
              >
                <option key={"1"} value={"User"}>
                  User
                </option>
              </Select>
            </div>
          </div>
          <div className="flex items-start justify-end gap-3 self-stretch w-full">
            <CustomButton
              label={"Save changes"}
              textColor={"white"}
              btnColor={"primary"}
              onClick={handleSaveChanges}
            />
            <CustomButton
              label={"Cancel"}
              textColor={"black"}
              btnColor={"white"}
              borderColor={"gray-300"}
              onClick={onCancelUpdate}
            />
          </div>
        </div>
        <div className="flex w-1/2 self-stretch p-4 flex-col gap-6 rounded-2xl border-1 border-solid border-gray-300 bg-white justify-between">
          <div className="flex items-center gap-4">
            <span className="heading-4">Shipping address </span>
            <img src={InfoOutline} width={24} height={24} />
          </div>
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminDropdown
              title={"Save address"}
              items={
                addressData?.data.data.map((address) => {
                  return {
                    key: address.id,
                    value: address.street,
                  };
                }) || []
              }
              name={"saveAddress"}
              value={
                addressData?.data?.data[addressId ?? 0]?.street ??
                "There's no address saved"
              }
              onChange={function (e: any, key: number): void {
                console.log(key);
                setAddressId(key);
                setAddress(addressData?.data.data.find((a) => a.id === key));
              }}
            />
          </div>
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminTextArea
              title={"Your address*"}
              placeholder={"Enter your address"}
              name={"street"}
              value={address?.street}
              onChange={handleAdressChange}
            />
          </div>
          <div className="flex w-full items-stretch justify-between gap-8">
            <AdminInput
              title={"Ward*"}
              placeholder={"Enter your ward"}
              onChange={handleAdressChange}
              name={"ward"}
              value={address?.ward ?? ""}
              type={"text"}
            />
            <AdminInput
              title={"District*"}
              placeholder={"Enter your district"}
              onChange={handleAdressChange}
              name={"district"}
              value={address?.district ?? ""}
              type={"text"}
            />
          </div>
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminDropdown
              title={"City*"}
              items={[
                { key: 1, value: "Ho Chi Minh" },
                { key: 2, value: "Ha Noi" },
                { key: 3, value: "Da Nang" },
                { key: 4, value: "Hai Phong" },
                { key: 5, value: "Can Tho" },
              ]}
              name={"city"}
              value={address?.city ?? ""}
              onChange={handleAdressChange}
            />
          </div>
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminDropdown
              title={"Country*"}
              items={[
                {
                  key: 1,
                  value: "Viet Nam",
                },
                {
                  key: 2,
                  value: "United States",
                },
                {
                  key: 3,
                  value: "United Kingdom",
                },
                {
                  key: 4,
                  value: "Australia",
                },
              ]}
              name={"country"}
              value={address?.country ?? ""}
              onChange={handleAdressChange}
            />
            <AdminInput
              title={"Zip code*"}
              placeholder={"Enter your zip code"}
              onChange={handleAdressChange}
              name={"zipCode"}
              value={address?.zipCode ?? ""}
              type={"text"}
            />{" "}
          </div>
          <div className="flex items-start justify-end gap-3 self-stretch w-full">
            <CustomButton
              label={"Save changes"}
              onClick={handleCreateAddress}
              textColor={"white"}
              btnColor={"primary"}
            />
            <CustomButton
              label={"Cancel"}
              textColor={"black"}
              btnColor={"white"}
              borderColor={"gray-300"}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full self-stretch p-4 flex-col gap-6 rounded-2xl border-1 border-solid border-gray-300 bg-white">
        <div className="flex items-center gap-4">
          <span className="heading-4">Password</span>
          <img src={InfoOutline} width={24} height={24} />
        </div>

        <div className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminPassword
              title={"Current password*"}
              placeholder={"Enter your current password"}
              onChange={handlePasswordChange}
              type={"password"}
              name={"currentPassword"}
              value={currentPassword}
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminPassword
              title={"New password*"}
              placeholder={"Enter your new password"}
              onChange={handlePasswordChange}
              type={"newPassword"}
              name={"newPassword"}
              value={newPassword}
            />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminPassword
              title={"Confirm password*"}
              placeholder={"Confirm your new password"}
              onChange={handlePasswordChange}
              type={"password"}
              name={"repeatNewPassword"}
              value={repeatNewPassword}
            />
          </div>
        </div>
        <div className="flex p-4 flex-col items-start gap-2 self-strech bg-gray-50 content-border">
          <span className="text-md font-medium">Password requirements:</span>
          <div className="flex flex-end gap-3">
            <BooleanIcon isSuccess={passLengthValid} />
            <span
              className={`text-sm font-semibold transition-colors ${
                passLengthValid ? "text-success" : "text-red-500"
              }`}
            >
              At least 8 characters (and up to 50 characters)
            </span>
          </div>
          <div className="flex flex-end gap-3">
            <BooleanIcon isSuccess={passHaveUppercase} />
            <span
              className={`text-sm font-semibold transition-colors ${
                passHaveUppercase ? "text-success" : "text-red-500"
              }`}
            >
              At least one uppercase character
            </span>
          </div>
          <div className="flex flex-end gap-3">
            <BooleanIcon isSuccess={passContainSpecialChar} />
            <span
              className={`text-sm font-semibold transition-colors ${
                passContainSpecialChar ? "text-success" : "text-red-500"
              }`}
            >
              Inclusion of at least one special character, e.g.,! @ # ?
            </span>
          </div>
          <div className="flex flex-end gap-3">
            <BooleanIcon isSuccess={isNewPass} />
            <span
              className={`text-sm font-semibold transition-colors ${
                isNewPass ? "text-success" : "text-red-500"
              }`}
            >
              Different from your previous passwords
            </span>
          </div>
        </div>
        <div className="flex items-start justify-end gap-3 self-stretch w-full">
          <CustomButton
            label={"Save changes"}
            textColor={"white"}
            btnColor={"primary"}
            onClick={handleUpdateUserPassword}
          />
          <CustomButton
            label={"Cancel"}
            textColor={"black"}
            btnColor={"white"}
            borderColor={"gray-300"}
            onClick={onClickCancelChangePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
