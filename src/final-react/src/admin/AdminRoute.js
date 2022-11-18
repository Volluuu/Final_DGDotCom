import './userTable.css';
import { useParams} from "react-router-dom";
import React from "react"
import AdminMenu from "./AdminMenu";
function AdminRoute(props) {
    const {path}=useParams();


    return (
        <div className='hjhj'>
                <AdminMenu/>
        </div>
    );
}

export default AdminRoute;