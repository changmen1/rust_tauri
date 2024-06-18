import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { dialog } from "@tauri-apps/api";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  const handleWx = async () => {
    try {
      const selected = await dialog.message("zxl1907395787", {
        title: "作者微信",
        type: "warning",
        okLabel: "👻",
      });
      console.log("Selected file:", selected);
    } catch (error) {
      console.error("Error opening dialog:", error);
    }
  };

  return (
    <div className="container">
      <h1>👻囧囧囧🌻-🍍我从不幻想成功😶‍🌫️-😵我只会为了成功努力实践🤡</h1>
      <div className="row">
        <a href="https://x.com/home?lang=zh" target="_blank">
          <img src="/x.svg" className="logo Github" alt="twitter logo" />
        </a>
        <a href="https://github.com/changmen1" target="_blank">
          <img src="/github.svg" className="logo Github" alt="Github logo" />
        </a>
        <a onClick={handleWx} target="_blank">
          <img src="/wechat.svg" className="logo Github" alt="Github logo" />
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
