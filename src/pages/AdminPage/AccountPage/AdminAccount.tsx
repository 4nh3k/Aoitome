import AdminInput from "../../../components/AdminComponents/Input/AdminInput"
import AdminDropdown from "../../../components/AdminComponents/Input/AdminDropdown";
import CustomButton from "../../../components/AdminComponents/CustomButton/CustomButton";
import InfoOutline from "../../../assets/icon/info-outline.svg"
import ElysiaImg from "../../../assets/img/elysia.jpg"
import UploadIcon from "../../../assets/icon/upload.svg"
import LinkingAccount from "../../../components/AdminComponents/LinkingAccount.tsx/LinkingAccount";
import GoogleLogo from "../../../assets/icon/google-logo.svg"
import GithubLogo from "../../../assets/icon/github-logo.svg"
import XCircle from "../../../assets/icon/x-circle.svg"
import CheckCircle from "../../../assets/icon/check-circle.svg"

const AdminAccount = () => {
  const timezones = ['Vietnam']
  const accountTypes = ['Admin', 'Customer']

  return (
    <div className='bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm'>
      <div className="flex items-start basis-full gap-4 ">
        <div className="flex flex-col pt-4 pb-5 px-4 justify-between w-3/4 gap-8 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <div className="flex items-center gap-4">
            <span className="heading-4">Account</span>
            <img src={InfoOutline} width={24} height={24} />
          </div>

          <div className="flex w-[18.75rem] justify-between items-center gap-4">
            <img src={ElysiaImg} width={72} height={72} className="flex-shrink-0 rounded-full" />
            <CustomButton label={"Upload"} textColor={"white"} btnColor={"primary"} imgSrc={UploadIcon} />
            <CustomButton label={"Remove"} textColor={"black"} btnColor={"white"} borderColor="gray-300" />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Username*"} placeholder={"Enter username"} />
            <AdminInput title={"Full name*"} placeholder={"Enter full name"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Your email*"} placeholder={"Enter email"} />
            <AdminInput title={"Phone number*"} placeholder={"(+123) 456 789"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminInput title={"Country"} placeholder={"Enter country"} />
            <AdminInput title={"City"} placeholder={"Enter city"} />
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminDropdown title='Timezone' items={timezones} />
            <AdminDropdown title='Account type' items={accountTypes} />
          </div>

          <div className="flex w-full self-strech flex-col items-start gap-4">
            <div className="flex flex-col self-strech flex-start gap-1">
              <span className="heading-6">Linked accounts</span>
              <span className="font-normal text-base leading-6">We use this to help you sign in and populate your profile information</span>
            </div>
            <LinkingAccount logo={GoogleLogo} />
            <LinkingAccount logo={GithubLogo} />
          </div>

          <div className="flex items-start justify-end gap-3 self-stretch w-full" >
            <CustomButton label={"Save changes"} textColor={"white"} btnColor={"primary"} />
            <CustomButton label={"Cancel"} textColor={"black"} btnColor={"white"} borderColor={"gray-300"} />
          </div>
        </div>

        <div className="flex w-6/12 self-stretch p-4 flex-col gap-6 rounded-2xl border-1 border-solid border-gray-300 bg-white">
          <div className="flex items-center gap-4">
            <span className="heading-4">Password</span>
            <img src={InfoOutline} width={24} height={24} />
          </div>

          <div className="flex flex-col items-start gap-5 self-stretch">
            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <AdminInput title={"Current password*"} placeholder={"Enter your current password"} />
            </div>

            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <AdminInput title={"New password*"} placeholder={"Enter your new password"} />
            </div>

            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <AdminInput title={"Confirm password*"} placeholder={"Confirm your new password"} />
            </div>
          </div>
          
          <div className="flex p-4 flex-col items-start gap-2 self-strech bg-gray-50">
            <span className="text-lg font-medium">Password requirements:</span>
            <span className="text-lg font-normal text-gray-500">Ensure that these requirements are met:</span>
            <div className="flex flex-end gap-3">
              <img src={CheckCircle} width={12} height={12} />
              <span className="text-sm font-normal">At least 8 characters (and up to 50 characters)</span>
            </div>
            <div className="flex flex-end gap-3">
              <img src={CheckCircle} width={12} height={12} />
              <span className="text-sm font-normal">At least one lowercase character</span>
            </div>
            <div className="flex flex-end gap-3">
              <img src={XCircle} width={12} height={12} />
              <span className="text-sm font-normal">Inclusion of at least one special character, e.g.,! @ # ?</span>
            </div>
            <div className="flex flex-end gap-3">
              <img src={XCircle} width={12} height={12} />
              <span className="text-sm font-normal">Different from your previous passwords</span>
            </div>
          </div>
          <div className="flex items-start justify-end gap-3 self-stretch w-full" >
            <CustomButton label={"Save changes"} textColor={"white"} btnColor={"primary"} />
            <CustomButton label={"Cancel"} textColor={"black"} btnColor={"white"} borderColor={"gray-300"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAccount