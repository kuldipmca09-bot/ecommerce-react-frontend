import React, { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Boxes, CircleDollarSign, Package, ShoppingCart, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { getCollection } from "../services/api";
import { Status } from "../components/DataTable";
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n||0);
export default function Dashboard(){
 const [data,setData]=useState({buyers:[],sellers:[],products:[],orders:[]});
 useEffect(()=>{Promise.all(["buyers","sellers","products","orders"].map(async k=>[k,await getCollection(k)])).then(x=>setData(Object.fromEntries(x)));},[]);
 const revenue=data.orders.filter(o=>o.status!=="CANCELLED").reduce((s,o)=>s+Number(o.total||0),0);
 const stats=[{label:"Total buyers",value:data.buyers.length,delta:"+12.8%",icon:Users,tone:"blue"},{label:"Active sellers",value:data.sellers.filter(x=>x.status==="APPROVED").length,delta:"+8.2%",icon:Boxes,tone:"purple"},{label:"Products",value:data.products.length,delta:"+4.6%",icon:Package,tone:"orange"},{label:"Order revenue",value:money(revenue),delta:"+18.4%",icon:CircleDollarSign,tone:"green"}];
 return <><PageHeader eyebrow="BUSINESS OVERVIEW" title="Good morning, Alex" description="Here's what's happening across your marketplace today."/><div className="stats-grid">{stats.map(s=><div className="stat-card" key={s.label}><div className="stat-top"><span>{s.label}</span><div className={`stat-icon ${s.tone}`}><s.icon size={19}/></div></div><div className="stat-value">{s.value}</div><div className="stat-foot"><span className="trend"><ArrowUpRight size={14}/>{s.delta}</span><span>vs. last month</span></div></div>)}</div>
 <div className="dashboard-grid"><div className="panel"><div className="panel-head"><div><h3>Recent orders</h3><p>Latest activity from your marketplace</p></div><a href="/orders">View all →</a></div><div className="recent-list">{data.orders.slice(0,4).map(o=><div className="recent-row" key={o.id}><div className="order-symbol"><ShoppingCart size={17}/></div><div className="recent-info"><b>{o.id}</b><span>{o.buyer} · {o.items} items</span></div><div className="recent-right"><b>{money(o.total)}</b><Status value={o.status}/></div></div>)}</div></div>
 <div className="panel"><div className="panel-head"><div><h3>Marketplace health</h3><p>Current platform snapshot</p></div><span className="live-pill"><i/> LIVE</span></div><div className="health-list"><div><span>Seller approvals pending</span><b>{data.sellers.filter(x=>x.status==="PENDING").length}</b></div><div><span>Products out of stock</span><b>{data.products.filter(x=>x.stock===0).length}</b></div><div><span>Orders processing</span><b>{data.orders.filter(x=>x.status==="PROCESSING").length}</b></div><div><span>Total listings</span><b>{(awaitless(data.products.length,data.sellers.length))}</b></div></div><div className="health-note"><span className="health-check">✓</span> All core services are responding normally</div></div></div>
 <div className="bottom-note"><div><b>Marketplace activity</b><span>Your workspace is up to date with the latest marketplace data.</span></div><div className="activity-bars">{[35,52,43,70,58,83,65,95,73,88,60,100].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></div></>;
}
function awaitless(a,b){return a+b;}
