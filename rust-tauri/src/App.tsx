import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <h1>👻囧囧囧🌻</h1>
      <div className="row">
        <a href="https://x.com/home?lang=zh" target="_blank">
          <img src="/x.svg" className="logo Github" alt="twitter logo" />
        </a>
        <a href="https://github.com/changmen1" target="_blank">
          <img src="/github.svg" className="logo Github" alt="Github logo" />
        </a>
      </div>
      <p>If this helps you, please click a Star for me on GitHub</p>
      <p>
        &copy; Copyright 2024
        <a href="https://github.com/changmen1" target="_blank">
          Zxl
        </a>
      </p>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
