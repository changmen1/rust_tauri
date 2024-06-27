import { Box, Button } from "@mui/material";
import { dialog, invoke } from "@tauri-apps/api";
import { VariantType, enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Doctor() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleWx = async () => {
    try {
      const selected = await dialog.message("zxl1907395787", {
        title: "作者微信",
        type: "info",
        okLabel: "🤡",
      });
      console.log("Selected file:", selected);
    } catch (error) {
      console.error("Error opening dialog:", error);
    }
  };
  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  const handleQuite = () => {
    // navigate("/", { replace: true });
    navigate("/");
  };

  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar("hhh", { variant });
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="container">
          <h1>👻囧囧囧🌻-🍍囧囧囧😶‍🌫️-😵囧囧囧🤡</h1>
          <div className="row">
            <a href="https://x.com/home?lang=zh" target="_blank">
              <img src="/x.svg" className="logo Github" alt="twitter logo" />
            </a>
            <a href="https://github.com/changmen1" target="_blank">
              <img
                src="/github.svg"
                className="logo Github"
                alt="Github logo"
              />
            </a>
            <a onClick={handleWx} target="_blank">
              <img
                src="/wechat.svg"
                className="logo Github"
                alt="Github logo"
              />
            </a>
          </div>
          <p>If this helps you, please click a Star for me on GitHub</p>
          <p>
            &copy; Copyright 2024 - Github
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
          <div>
            <Button variant="contained" onClick={handleQuite}>
              退出登录
            </Button>
            <Button onClick={handleClickVariant("success")}>触发消息</Button>
          </div>
        </div>
      </Box>
    </>
  );
}
export default Doctor;
