import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useAppContext } from "../context/useAppContext";
import { useContacts } from "../hooks/useContacts";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import InteractionLog from "./InteractionLog";
import InteractionForm from "./InteractionForm";

interface Props {
  modalMode: string;
  setModalMode: (mode: string) => void;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const ContactModal: React.FC<Props> = ({ modalMode, setModalMode, isOpen, onClose, handleClose }) => {
  const { selectedContact, setSelectedContact, editableContact } = useAppContext();
  const { updateContact, createContact } = useContacts();
  const [isInteractionFormOpen, setIsInteractionFormOpen] = useState(false);

  return (
    <Modal backdrop={"blur"} size="5xl" isOpen={isOpen} placement="auto" onClose={handleClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {modalMode === "view" && "Contact Details"}
          {modalMode === "edit" && "Edit Contact"}
          {modalMode === "create" && "Create Contact"}
        </ModalHeader>
        <ModalBody>
          {modalMode === "view" && selectedContact && (
            <>
              <ContactCard contact={selectedContact} setModalMode={setModalMode} />
              <InteractionLog contactId={selectedContact._id} onOpen={() => setIsInteractionFormOpen(true)} />
              <InteractionForm
                contactId={selectedContact._id}
                isOpen={isInteractionFormOpen}
                onClose={() => setIsInteractionFormOpen(false)}
              />
            </>
          )}
          {modalMode === "edit" && <ContactForm />}
          {modalMode === "create" && <ContactForm />}
        </ModalBody>
        <ModalFooter>
          {modalMode === "view" && (
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          )}
          {modalMode === "edit" && (
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
                      name: editableContact?.name || "",
                      email: editableContact?.email || "",
                      phone: editableContact?.phone || "",
                      position: editableContact?.position || "",
                      company: editableContact?.company || "",
                      location: editableContact?.location || "",
                      description: editableContact?.description || "",
                      avatar: editableContact?.avatar || "",
                      team: editableContact?.team || "",
                      status: editableContact?.status || "",
                    },
                  }).then((result) => {
                    console.log(result);
                    setSelectedContact(editableContact);
                    setModalMode("view");
                  })
                }
              >
                Save
              </Button>
            </>
          )}
          {modalMode === "create" && (
            <>
              <Button color="danger" variant="light" onPress={handleClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() =>
                  createContact({
                    contact: {
                      name: editableContact?.name || "",
                      email: editableContact?.email || "",
                      phone: editableContact?.phone || "",
                      position: editableContact?.position || "",
                      company: editableContact?.company || "",
                      location: editableContact?.location || "",
                      description: editableContact?.description || "",
                      avatar: editableContact?.avatar || "",
                      team: editableContact?.team || "",
                      status: editableContact?.status || "",
                    },
                  }).then((result) => {
                    console.log(result);
                    setSelectedContact(editableContact);
                    setModalMode("view");
                  })
                }
              >
                Save
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;
