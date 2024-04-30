import { Button, FloatingLabel, Modal } from "flowbite-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface RegisterModalsProps {
  openModal: boolean;
  onCloseModal: () => void;
  onSignInClick: () => void;
}

export function RegisterModals({
  openModal,
  onCloseModal,
  onSignInClick,
}: RegisterModalsProps) {
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <div className="w-full text-black text-2xl font-bold text-center">
            Sign up
          </div>
          <FloatingLabel variant="outlined" label="Username" />
          <FloatingLabel variant="outlined" label="Email" />
          <FloatingLabel variant="outlined" label="Password" />
          <FloatingLabel variant="outlined" label="Repeat Password" />

          <Button className="w-full">Sign up</Button>
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
          <span className="text-black text-sm font-medium">
            Already have an account?{" "}
          </span>
          <button
            onClick={onSignInClick}
            className="text-blue-700 text-sm font-medium cursor-pointer hover:underline"
          >
            Sign in
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
