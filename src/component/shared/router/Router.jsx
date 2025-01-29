import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../../../pages/Home";
import Dev from "../../../pages/Dev";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/dev"} element={<Dev />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
