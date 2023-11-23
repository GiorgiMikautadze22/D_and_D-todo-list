import { useState } from "react";
import "./App.css";
import NewGroupInput from "./Components/NewGroupInput";
import Groups from "./Components/Groups";

function App() {
  const [input, setInput] = useState("");
  const [group, setGroup] = useState<string[]>([]);
  const [todo, setTodo] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGroup([...group, input]);
    setInput("");
  };

  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <NewGroupInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
      <Groups
        group={group}
        todo={todo}
        setTodo={setTodo}
        addNewTodo={addNewTodo}
      />
    </div>
  );
}

export default App;
