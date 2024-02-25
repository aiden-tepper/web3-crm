// import { useAppContext } from "../context/useAppContext";
// import ContactForm from "../components/ContactForm";
// import ContactView from "./ContactView";
import { useState, useCallback } from "react";
import ContactsTable from "../components/ContactsTable";
import ContactModal from "../components/ContactModal";
// import InteractionModal from "../components/InteractionModal";
import DeleteModal from "../components/DeleteModal";
import { useDisclosure } from "@nextui-org/react";
import { useAppContext } from "../context/useAppContext";
import { useContacts } from "../hooks/useContacts";

const MainView = () => {
  // const { mode } = useAppContext();

  // if (mode === "view") {
  //   return <ContactView />;
  // } else if (mode === "create" || mode === "edit") {
  //   return <ContactForm />;
  // }

  const [modalMode, setModalMode] = useState("view");
  const { setSelectedContact, setEditableContact } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getContacts } = useContacts();
  const contacts = getContacts;
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { deleteContact } = useContacts();
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  const handleOpen = (key: string) => {
    if (key === "create") {
      setEditableContact({
        _id: "", // generated by backend
        name: "",
        email: "",
        phone: "",
        position: "",
        company: "",
        location: "",
        description: "",
        avatar: "",
        team: "",
        status: "",
      });
      setModalMode("create");
      onOpen();
    } else {
      setSelectedContact(contacts?.find((contact) => contact._id === key) ?? null);
      onOpen();
    }
  };

  const handleClose = () => {
    setSelectedContact(null);
    setModalMode("view");
    onClose();
  };

  const confirmDelete = useCallback(() => {
    if (contactToDelete) {
      deleteContact({ id: contactToDelete })
        .then(() => {
          // You might want to refresh the contacts list here or show a success message
        })
        .finally(() => {
          setIsDeleteModalVisible(false);
          setContactToDelete(null);
        });
    }
  }, [contactToDelete, deleteContact]);

  const cancelDelete = useCallback(() => {
    setIsDeleteModalVisible(false);
    setContactToDelete(null);
  }, []);

  return (
    <>
      <ContactsTable
        contacts={contacts}
        handleOpen={handleOpen}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        setContactToDelete={setContactToDelete}
      ></ContactsTable>
      <ContactModal
        modalMode={modalMode}
        setModalMode={setModalMode}
        isOpen={isOpen}
        onClose={onClose}
        handleClose={handleClose}
      ></ContactModal>
      {/* <InteractionModal></InteractionModal> */}
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        cancelDelete={cancelDelete}
        confirmDelete={confirmDelete}
      ></DeleteModal>
    </>
  );
};

export default MainView;
