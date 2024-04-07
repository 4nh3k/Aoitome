import { Button, FloatingLabel, Modal } from "flowbite-react";

interface ForgotPassModalsProps {
  openModal: boolean;
  onCloseModal: () => void;
}

export function ForgotPassModals({
  openModal,
  onCloseModal,
}: ForgotPassModalsProps) {
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <div className="w-full text-black text-2xl font-bold text-center">
            Forgot pass
          </div>
          <FloatingLabel variant="outlined" label="Password" />
          <FloatingLabel variant="outlined" label="Repeat Password" />
          <Button className="w-full">Confirm</Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer className="border-t">
        <div className="w-full text-center">
          <Button>Back</Button>
        </div>
      </Modal.Footer> */}
    </Modal>
  );
}
