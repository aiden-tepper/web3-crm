import React from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useAppContext } from "../context/useAppContext";
import { useContacts } from "../hooks/useContacts";

interface Props {
  modalMode: string;
  setModalMode: (mode: string) => void;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const ContactModal: React.FC<Props> = ({ modalMode, setModalMode, isOpen, onClose, handleClose }) => {
  const { selectedContact, handleContactFieldChange, editableContact } = useAppContext();
  const { updateContact } = useContacts();

  return (
    <Modal
      backdrop={"blur"}
      size="5xl"
      isOpen={isOpen}
      placement="auto"
      onClose={handleClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {modalMode === "view" ? "Contact Details" : "Edit Contact"}
        </ModalHeader>
        <ModalBody>
          {modalMode === "view" ? (
            selectedContact && (
              <div>
                <p>Name: {selectedContact.name}</p>
                <p>Position: {selectedContact.position}</p>
                <p>Team: {selectedContact.team}</p>
                <p>Email: {selectedContact.email}</p>
                <p>Status: {selectedContact.status}</p>
                <p>Location: {selectedContact.location}</p>
                <p>Company: {selectedContact.company}</p>
                <p>Phone: {selectedContact.phone}</p>
                <p>Description: {selectedContact.description}</p>
                <p>Avatar: {selectedContact.avatar}</p>
                <Button color="primary" onPress={() => setModalMode("edit")}>
                  Edit
                </Button>
              </div>
            )
          ) : (
            <form>
              <Input
                size="md"
                type="text"
                label="Name"
                defaultValue={selectedContact?.name}
                onValueChange={(e) => handleContactFieldChange("name", e)}
              />
              <Input
                size="md"
                type="text"
                label="Position"
                defaultValue={selectedContact?.position}
                onValueChange={(e) => handleContactFieldChange("position", e)}
              />
              <Input
                size="md"
                type="text"
                label="Team"
                defaultValue={selectedContact?.team}
                onValueChange={(e) => handleContactFieldChange("team", e)}
              />
              <Input
                size="md"
                type="email"
                label="Email"
                defaultValue={selectedContact?.email}
                onValueChange={(e) => handleContactFieldChange("email", e)}
              />
              <Input
                size="md"
                type="text"
                label="Status"
                defaultValue={selectedContact?.status}
                onValueChange={(e) => handleContactFieldChange("status", e)}
              />
              <Input
                size="md"
                type="text"
                label="Location"
                defaultValue={selectedContact?.location}
                onValueChange={(e) => handleContactFieldChange("location", e)}
              />
              <Input
                size="md"
                type="text"
                label="Company"
                defaultValue={selectedContact?.company}
                onValueChange={(e) => handleContactFieldChange("company", e)}
              />
              <Input
                size="md"
                type="tel"
                label="Phone"
                defaultValue={selectedContact?.phone}
                onValueChange={(e) => handleContactFieldChange("phone", e)}
              />
              <Input
                size="md"
                type="text"
                label="Description"
                defaultValue={selectedContact?.description}
                onValueChange={(e) => handleContactFieldChange("description", e)}
              />
              <Input
                size="md"
                type="text"
                label="Avatar"
                defaultValue={selectedContact?.avatar}
                onValueChange={(e) => handleContactFieldChange("avatar", e)}
              />
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          {modalMode === "edit" ? (
            <>
              <Button color="danger" variant="light" onPress={() => setModalMode("view")}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() =>
                  updateContact({
                    id: editableContact?._id,
                    updates: {
                      name: editableContact?.name,
                      email: editableContact?.email,
                      phone: editableContact?.phone,
                      position: editableContact?.position,
                      company: editableContact?.company,
                      location: editableContact?.location,
                      description: editableContact?.description,
                      avatar: editableContact?.avatar,
                      team: editableContact?.team,
                      status: editableContact?.status,
                    },
                  }).then((result) => {
                    console.log(result);
                    setModalMode("view");
                  })
                }
              >
                Save
              </Button>
            </>
          ) : (
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;
