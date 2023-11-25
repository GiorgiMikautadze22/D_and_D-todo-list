import { useState } from "react";
import "./App.css";
import NewGroupInput from "./Components/NewGroupInput";
import Groups from "./Components/Groups";
import { useTodoContext } from "./Context";

function App() {
  return (
    <div className="App">
      <NewGroupInput />
      <Groups />
    </div>
  );
}

export default App;
