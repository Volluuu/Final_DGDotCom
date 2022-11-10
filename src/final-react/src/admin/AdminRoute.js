import './userTable.css';
import { useParams} from "react-router-dom";
import DashBoard from "./DashBoard";
import UserInfo from "./UserInfo";
import AdProduct from "./AdProduct";
import Shipping from "./Shipping";
import Cs from "./Cs";
import Banner from "./Banner";
import React from "react"
import AdminMenu from "./AdminMenu";
function AdminRoute(props) {
    const {path}=useParams();


    return (
        <div>
                <AdminMenu/>
        </div>
    );
}

export default AdminRoute;