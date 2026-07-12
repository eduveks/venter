import _auth from "@netuno/auth-client";
import {Button, Typography} from "antd";
import {useNavigate, useLocation} from "react-router-dom";
import NotFound from "../NotFound";
import Dashboard from "./Dashboard";
import Activities from "./Activities";
import Payments from "./Payments";
import MyActivities from "./MyActivities";

import "./index.less";

const {Title} = Typography;

function ReservedArea() {
    const navigate = useNavigate();
    const location = useLocation();
    if (_auth.isLogged()) {
        if (location.pathname === "/dashboard") {
            return <Dashboard/>;
        }
        if (location.pathname === "/academic") {
            return <Activities type="academic"/>;
        }
        if (location.pathname === "/tourism") {
            return <Activities type="tourism"/>;
        }
        if (location.pathname === "/payments") {
            return <Payments/>;
        }
        if (location.pathname === "/my-activities") {
            return <MyActivities/>;
        }
        return <NotFound />;
    }
    return (
        <section className="reserved-area">
            <Title>Não Autorizado</Title>
            <p>
                É necessário realizar a autenticação para aceder a área reservada.
            </p>
            <Button type="primary" onClick={() => navigate("/login")}>
                Ir para o Login
            </Button>
        </section>
    );
}

export default ReservedArea;
