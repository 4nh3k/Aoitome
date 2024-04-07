import { Button, Checkbox, FloatingLabel, Label, Modal } from "flowbite-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface LoginModalsProps {
  openModal: boolean;
  onCloseModal: () => void;
  onSignUpClick: () => void;
  onForgotPassClick: () => void;
}

export function LoginModals({
  openModal,
  onCloseModal,
  onSignUpClick,
  onForgotPassClick,
}: LoginModalsProps) {
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <div className="w-full text-black text-2xl font-bold text-center">
            Sign in
          </div>
          <FloatingLabel variant="outlined" label="Email" />
          <FloatingLabel variant="outlined" label="Password" />
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <button
              onClick={onForgotPassClick}
              className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Forgot Password?
            </button>
          </div>
          <Button className="w-full">Sign in</Button>
          <div className="text-gray-600 text-sm font-medium w-full text-center">
            or use a social network
          </div>
          <div className="flex justify-center gap-4">
            <button className="w-9 h-9">
              <FaLinkedin className="text-blue-700" size={36} />
            </button>
            <button>
              <FcGoogle size={36} />
            </button>
            <button className="w-9 h-9">
              <FaFacebook className="text-blue-600" size={36} />
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t">
        <div className="w-full text-center">
          <span className="text-black text-sm font-medium font-['Inter'] leading-[21px]">
            Not a member yet?{" "}
          </span>
          <button
            onClick={onSignUpClick}
            className="text-blue-700 text-sm font-medium hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
