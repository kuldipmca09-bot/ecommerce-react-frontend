import React from "react";
import { X } from "lucide-react";
export default function Modal({title,children,onClose,onSubmit,submitLabel="Save changes"}) {
 return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><div className="modal-head"><h3>{title}</h3><button className="icon-button" onClick={onClose}><X size={18}/></button></div><form onSubmit={onSubmit}><div className="modal-body">{children}</div><div className="modal-foot"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" type="submit">{submitLabel}</button></div></form></div></div>;
}
