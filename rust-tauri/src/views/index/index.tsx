import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { dialog } from "@tauri-apps/api";
import { Button } from "@mui/material";
import { useSnackbar, VariantType } from "notistack";
import { useNavigate } from "react-router-dom";
import "./index.css";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CloseFullscreenSharpIcon from "@mui/icons-material/CloseFullscreenSharp";
import MinimizeOutlinedIcon from "@mui/icons-material/MinimizeOutlined";
import { appWindow } from "@tauri-apps/api/window";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Index() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }
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
  const handleQuite = () => {
    navigate("/", { replace: true });
  };
  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar("hhh", { variant });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar data-tauri-drag-region>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            中央监护系统Rust版本
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
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "doctor", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  console.log(text);
                  // navigate(text);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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
    </Box>
  );
}

export default Index;
