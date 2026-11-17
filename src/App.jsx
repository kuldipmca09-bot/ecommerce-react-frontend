import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Management from "./pages/Management";
import Access from "./pages/Access";
import { useAuth } from "./context/AuthContext";

function Unauthorized(){return <div className="not-found"><div>403</div><h2>Access restricted</h2><p>Your account does not have permission to view this module.</p><a href="/">Return to dashboard</a></div>;}
function Landing(){const {isAuthenticated}=useAuth();return <Navigate to={isAuthenticated?"/":"/login"} replace/>;}
export default function App(){return <Routes><Route path="/login" element={<Login/>}/><Route element={<ProtectedRoute/>}><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route element={<ProtectedRoute roles={["ADMIN"]}/> }><Route path="/buyers" element={<Management type="buyers"/>}/><Route path="/sellers" element={<Management type="sellers"/>}/><Route path="/access" element={<Access/>}/></Route><Route element={<ProtectedRoute roles={["ADMIN","SELLER"]}/> }><Route path="/products" element={<Management type="products"/>}/><Route path="/listings" element={<Management type="listings"/>}/></Route><Route element={<ProtectedRoute roles={["ADMIN","SELLER","BUYER"]}/> }><Route path="/orders" element={<Management type="orders"/>}/></Route></Route></Route><Route path="/unauthorized" element={<Unauthorized/>}/><Route path="*" element={<Landing/>}/></Routes>;}
