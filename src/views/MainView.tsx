// import { useAppContext } from "../context/useAppContext";
// import ContactForm from "../components/ContactForm";
// import ContactView from "./ContactView";
import { useState } from "react";
import ContactsTable from "../components/ContactsTable";
import ContactModal from "../components/ContactModal";
// import InteractionModal from "../components/InteractionModal";
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
  const { setSelectedContact } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getContacts } = useContacts();
  const contacts = getContacts;

  const handleOpen = (key: string) => {
    setSelectedContact(contacts?.find((contact) => contact._id === key) ?? null);
    onOpen();
  };

  const handleClose = () => {
    setSelectedContact(null);
    setModalMode("view");
    onClose();
  };

  return (
    <>
      <ContactsTable contacts={contacts} handleOpen={handleOpen}></ContactsTable>
      <ContactModal
        modalMode={modalMode}
        setModalMode={setModalMode}
        isOpen={isOpen}
        onClose={onClose}
        handleClose={handleClose}
      ></ContactModal>
      {/* <InteractionModal></InteractionModal> */}
    </>
  );
};

export default MainView;
