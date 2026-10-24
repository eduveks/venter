import {Layout, Row, Col} from "antd";

import { PhoneOutlined } from '@ant-design/icons';
import { FaWhatsapp } from "react-icons/fa";

const {Footer} = Layout;

function FooterBase() {
    return (
        <Footer>
          <Row>
            <Col xs={24} md={12} style={{textAlign: 'left'}}>
              <p>
                © somosventer.com.br {new Date().getFullYear()}
              </p>
            </Col>
            <Col xs={24} md={12} style={{textAlign: 'right'}}>
              <p>
                <a href="https://wa.me/+5544991722158" target="_blank">
                  <FaWhatsapp />
                  (44) 99172-2158
                </a>
              </p>
              <p>
                <a href="tel:44991722158">
                  <PhoneOutlined />
                  (44) 99172-2158
                </a>
              </p>
            </Col>
          </Row>
        </Footer>
    );
}

export default FooterBase;