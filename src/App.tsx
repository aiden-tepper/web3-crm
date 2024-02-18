import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

// Define an interface for the task object
interface Task {
  _id: string;
  text: string;
  isCompleted: boolean; // Assuming you have this field based on your initial data structure
}

function App() {
  const tasks = useQuery(api.tasks.get) as Task[]; // Cast the result to an array of Task objects
  return (
    <div className="App">
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}

export default App;