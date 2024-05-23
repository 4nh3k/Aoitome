import { useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import authApi from "../../../apis/auth.api";
import CheckCircle from "../../../assets/icon/check-circle.svg";
import InfoOutline from "../../../assets/icon/info-outline.svg";
import UploadIcon from "../../../assets/icon/upload.svg";
import XCircle from "../../../assets/icon/x-circle.svg";
import ElysiaImg from "../../../assets/img/elysia.jpg";
import CustomButton from "../../../components/AdminComponents/CustomButton/CustomButton";
import AdminInput from "../../../components/AdminComponents/Input/AdminInput";
import AdminPassword from "../../../components/AdminComponents/Input/AdminPassword";
import { User } from "../../../types/Models/Identity/User.type";
import { getUIDFromLS } from "../../../utils/auth";

const AdminAccount = () => {
  const userId = getUIDFromLS();
  const accountTypes = ["Admin", "Customer"];

  const [currentPassword, setCurrentPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>();

  const [adminProfile, setAdminProfile] = useState<User>();
  const [currentImg, setCurrentImg] = useState(ElysiaImg);
  const [oldImg, setOldImg] = useState();
  const [file, setFile] = useState<File>();
  const inputRef = useRef(null);

  const handleLoadImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
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

  const { data: adminData, isLoading: isLoadingAdminData } = useQuery({
    queryKey: ["admin"],
    queryFn: () => {
      return authApi.getUserProfile(userId);
    },
  });

  useEffect(() => {
    if (!isLoadingAdminData && adminData) {
      const admin = adminData?.data;
      setAdminProfile(admin);
      setCurrentImg(admin.profileImageLink);
      console.log(admin);
    }
  }, [isLoadingAdminData, adminData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdminProfile({ ...adminProfile, [name]: value });
  };

  const onRemoveImage = (e) => {
    setCurrentImg(adminProfile.profileImageLink);
  };

  const onCancelUpdate = (e) => {
    if (!isLoadingAdminData && adminData) {
      const admin = adminData?.data;
      setAdminProfile(admin);
      setCurrentImg(admin.profileImageLink);
      console.log(admin);
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
        ...adminProfile,
        ["profileImageLink"]: imageUrl,
      });
    },
  });

  const updateAccountMutation = useMutation({
    mutationKey: ["update-account", adminProfile?.userName],
    mutationFn: async (adminProfile: User) => {
      console.log("Began updating user...");
      setAdminProfile({ ...adminProfile, ["profileImageLink"]: currentImg });
      console.log(adminProfile);
      await authApi.updateUserProfile(userId, adminProfile);
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

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <div className="flex items-start basis-full gap-4 h-full ">
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
                adminProfile?.userName !== undefined
                  ? adminProfile?.userName
                  : ""
              }
              title={"Username*"}
              placeholder={"Enter username"}
              onChange={handleChange}
            />

            <AdminInput
              name={"fullName"}
              value={
                adminProfile?.fullName !== undefined
                  ? adminProfile?.fullName
                  : ""
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
              value={
                adminProfile?.email !== undefined ? adminProfile?.email : ""
              }
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
                adminProfile?.phoneNumber !== undefined
                  ? adminProfile?.phoneNumber
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
                adminProfile?.country !== undefined ? adminProfile?.country : ""
              }
              type={"text"}
            />
            <AdminInput
              title={"City"}
              placeholder={"Enter city"}
              onChange={handleChange}
              name={"city"}
              value={adminProfile?.city !== undefined ? adminProfile?.city : ""}
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
                value={"Admin"}
                disabled={true}
              >
                {accountTypes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* <div className="flex w-full self-strech flex-col items-start gap-4">
            <div className="flex flex-col self-strech flex-start gap-1">
              <span className="heading-6">Linked accounts</span>
              <span className="font-normal text-base leading-6">We use this to help you sign in and populate your profile information</span>
            </div>
            <LinkingAccount logo={GoogleLogo} />
            <LinkingAccount logo={GithubLogo} />
          </div> */}

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

        <div className="flex w-6/12 self-stretch p-4 flex-col gap-6 rounded-2xl border-1 border-solid border-gray-300 bg-white">
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

          <div className="flex p-4 flex-col items-start gap-2 self-strech bg-gray-50">
            <span className="text-lg font-medium">Password requirements:</span>
            <span className="text-lg font-normal text-gray-500">
              Ensure that these requirements are met:
            </span>
            <div className="flex flex-end gap-3">
              <img src={CheckCircle} width={20} height={20} />
              <span className="text-sm font-normal">
                At least 8 characters (and up to 50 characters)
              </span>
            </div>
            <div className="flex flex-end gap-3">
              <img src={CheckCircle} width={20} height={20} />
              <span className="text-sm font-normal">
                At least one lowercase character
              </span>
            </div>
            <div className="flex flex-end gap-3">
              <img src={XCircle} width={20} height={20} />
              <span className="text-sm font-normal">
                Inclusion of at least one special character, e.g.,! @ # ?
              </span>
            </div>
            <div className="flex flex-end gap-3">
              <img src={XCircle} width={20} height={20} />
              <span className="text-sm font-normal">
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
    </div>
  );
};

export default AdminAccount;
