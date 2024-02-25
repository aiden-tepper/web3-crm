import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";

interface Props {
  isDeleteModalVisible: boolean;
  cancelDelete: () => void;
  confirmDelete: () => void;
}

const DeleteModal: React.FC<Props> = ({ isDeleteModalVisible, cancelDelete, confirmDelete }) => (
  <Modal
    closeButton
    aria-labelledby="modal-title"
    isOpen={isDeleteModalVisible}
    onClose={cancelDelete}
    backdrop={"blur"}
    size="sm"
    placement="auto"
  >
    <ModalContent>
      <ModalHeader>Confirm Deletion</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>
          Delete
        </Button>
        <Button onClick={cancelDelete}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteModal;
