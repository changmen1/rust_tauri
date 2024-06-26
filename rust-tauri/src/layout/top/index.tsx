import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CloseFullscreenSharpIcon from "@mui/icons-material/CloseFullscreenSharp";
import MinimizeOutlinedIcon from "@mui/icons-material/MinimizeOutlined";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Top() {
  const menuId = "primary-search-account-menu";
  useEffect(() => {
    document
      .getElementById("titlebar-minimize")!
      .addEventListener("click", () => appWindow.minimize());
    document
      .getElementById("titlebar-maximize")!
      .addEventListener("click", () => appWindow.toggleMaximize());
    document
      .getElementById("titlebar-close")!
      .addEventListener("click", () => appWindow.close());
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        // color="error"
        style={{ backgroundColor: "#24292e" }}
      >
        <Toolbar data-tauri-drag-region>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            电影天堂
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              id="titlebar-minimize"
            >
              <MinimizeOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              id="titlebar-maximize"
            >
              <CloseFullscreenSharpIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              id="titlebar-close"
            >
              <CloseSharpIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <div className="main-box">
        <Outlet></Outlet>
      </div>
    </>
  );
}
