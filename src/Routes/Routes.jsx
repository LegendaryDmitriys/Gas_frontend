import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/routes";


import ImportData from "../pages/ImportDate";
import TypeFuels from "../pages/TypeFuels";
import Car from "../pages/Cars";
import Customers from "../pages/Customers";
import Brands from "../pages/Brands";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Fuelings from "../pages/Fuels";

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.ImportDate}  element={<ImportData/>}/>
    <Route path={ROUTES.TypeFuels}  element={<TypeFuels/>}/>
    <Route path={ROUTES.Cars}  element={<Car/>}/> 
    <Route path={ROUTES.Customers}  element={<Customers/>}/> 
    <Route path={ROUTES.Brands}  element={<Brands/>}/>  
    <Route path="/"  element={<Login/>}/>
    <Route path={ROUTES.Register}  element={<Register/>}/>   
    <Route path={ROUTES.Fuels}  element={<Fuelings/>}/>    
  </Routes>
);

export default AppRoutes;
