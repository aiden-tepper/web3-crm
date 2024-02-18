import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

// Define an interface for the contact object
interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  company: string;
  location: string;
  description: string;
}

function App() {
  // Fetch contacts using the Convex useQuery hook
  const contacts = useQuery(api.contacts.get) as Contact[];
  return (
    <div className="App">
      <h1>Contacts List</h1>
      <div>
        {contacts?.map(({ _id, firstName, lastName, email, phone, position, company, location, description }) => (
          <div key={_id} className="contact">
            <h2>{firstName} {lastName}</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Company:</strong> {company}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Description:</strong> {description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;