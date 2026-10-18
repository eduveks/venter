import _auth from "@netuno/auth-client";
import {Layout} from "antd";

const {Footer} = Layout;

function FooterBase() {
    return (
        <>
            {!_auth.isLogged() &&
                <Footer>© venter.com.br {new Date().getFullYear()}</Footer>
            }
        </>
    );
}

export default FooterBase;