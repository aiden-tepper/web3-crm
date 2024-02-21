import { useAppContext } from "../context/useAppContext";
import ContactForm from "../components/ContactForm";
import ContactView from "./ContactView";

const MainView = () => {
  const { mode } = useAppContext();

  if (mode === "view") {
    return <ContactView />;
  } else if (mode === "create" || mode === "edit") {
    return <ContactForm />;
  }
};

export default MainView;
