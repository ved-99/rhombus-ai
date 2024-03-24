import React from "react";
import { Box } from "@mui/material"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import LandingPage from "./LandingPage";
import FilePage from "./FilePage";

const Wrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/allfiles/:id/*" element={<FilePage/>}></Route>
      </Routes>
    </>
  )
}

export default Wrapper