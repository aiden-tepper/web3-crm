import { useAppContext } from "../context/useAppContext";
import ContactForm from "../components/ContactForm";
import ContactView from "./ContactView";

const MainView = () => {
  const { mode } = useAppContext();

  switch (mode) {
    case "view":
      return <ContactView />;
    case "create" || "edit":
      return <ContactForm />;
    default:
      return null;
  }
};

export default MainView;
