import React from "react";
import { Search, MoreHorizontal } from "lucide-react";
export function Status({value}) {
  const v=(value||"UNKNOWN").toLowerCase().replaceAll("_"," ");
  return <span className={`status status-${v.replaceAll(" ","-")}`}><i/>{v}</span>;
}
export default function DataTable({columns, rows, search, setSearch, searchPlaceholder="Search...", onEdit, onDelete, empty="No records found"}) {
  return <div className="table-card">
    <div className="table-toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={searchPlaceholder}/></div><span className="record-count">{rows.length} records</span></div>
    <div className="table-scroll"><table><thead><tr>{columns.map(c=><th key={c.key}>{c.label}</th>)}{(onEdit||onDelete)&&<th className="actions-head">ACTIONS</th>}</tr></thead>
      <tbody>{rows.length?rows.map((row,i)=><tr key={row.id??i}>{columns.map(c=><td key={c.key}>{c.render?c.render(row[c.key],row):row[c.key]??"—"}</td>)}{(onEdit||onDelete)&&<td><div className="row-actions">{onEdit&&<button onClick={()=>onEdit(row)} className="text-action">Edit</button>}{onDelete&&<button onClick={()=>onDelete(row)} className="more-button" title="Delete"><MoreHorizontal size={18}/></button>}</div></td>}</tr>):<tr><td colSpan={columns.length+1} className="empty-cell">{empty}</td></tr>}</tbody>
    </table></div>
  </div>;
}
