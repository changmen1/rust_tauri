// 弃用了BrowserRouter的这种路由方法  使用了路由管理的方法

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login/login";
import Index from "./views/index";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          {/* 布局组件 */}
          <Route>
            {/* 登陆组件 */}
            <Route index element={<Login></Login>}></Route>
            {/* 二级路由出口 */}
            <Route path="index" element={<Index></Index>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
