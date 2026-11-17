import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Activity, Bell, ChevronDown, Command, LayoutDashboard, LogOut, Menu, Package, ShoppingBag, ShoppingCart, Store, Users, UserRound, ShieldCheck, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const nav = [
  { label: "Overview", path: "/", icon: LayoutDashboard, roles: ["ADMIN","SELLER","BUYER"] },
  { label: "Buyers", path: "/buyers", icon: Users, roles: ["ADMIN"] },
  { label: "Sellers", path: "/sellers", icon: Store, roles: ["ADMIN"] },
  { label: "Products", path: "/products", icon: Package, roles: ["ADMIN","SELLER"] },
  { label: "Seller listings", path: "/listings", icon: ShoppingBag, roles: ["ADMIN","SELLER"] },
  { label: "Orders", path: "/orders", icon: ShoppingCart, roles: ["ADMIN","SELLER","BUYER"] },
  { label: "Access control", path: "/access", icon: ShieldCheck, roles: ["ADMIN"] }
];
export default function Layout() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, roles, logout } = useAuth();
  const navigate = useNavigate(); const location = useLocation();
  const roleNames = (roles || []).map(r => typeof r === "string" ? r.replace("ROLE_","") : r.authority?.replace("ROLE_",""));
  const visible = nav.filter(n => n.roles.some(r => roleNames.includes(r)));
  const title = visible.find(n => n.path === location.pathname)?.label || "Overview";
  const name = user?.name || user?.fullName || user?.email || "Account";
  return <div className="app-shell">
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Command size={20}/></div><span>commerce<span className="brand-light">OS</span></span><button className="mobile-close" onClick={()=>setOpen(false)}><X/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{visible.map(({label,path,icon:Icon})=><NavLink key={path} to={path} end={path==="/"} onClick={()=>setOpen(false)} className={({isActive})=>`nav-link ${isActive?"active":""}`}><Icon size={18}/><span>{label}</span>{label==="Orders"&&<span className="nav-count">4</span>}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Activity size={17}/></div><b>System status</b><span>All services operational</span><div className="online-dot"/></div><div className="sidebar-foot">CommerceOS <span>v1.0.0</span></div></div>
    </aside>
    {open&&<div className="scrim" onClick={()=>setOpen(false)}/>}
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={()=>setOpen(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <b>{title}</b></div></div>
        <div className="top-actions"><button className="icon-button" title="Notifications"><Bell size={18}/><i/></button><div className="profile-wrap"><button className="profile-button" onClick={()=>setProfileOpen(!profileOpen)}><div className="avatar">{name.slice(0,1).toUpperCase()}</div><span className="profile-name">{name}</span><ChevronDown size={15}/></button>{profileOpen&&<div className="profile-menu"><div className="profile-meta">{user?.email}<small>{roleNames.join(", ")}</small></div><button onClick={()=>{logout();navigate("/login")}}><LogOut size={16}/> Sign out</button></div>}</div></div>
      </header>
      <div className="page-content"><Outlet/></div>
    </main>
  </div>;
}
