import {Button, Col, Row, Typography} from "antd";

import _service from "@netuno/service-client";

import DateFormatter from "../../../../common/DateFormatter.js";

import { CheckSquareOutlined } from "@ant-design/icons";

import "./index.less";

const {Title, Link} = Typography;

function Item({uid, name, description, date_start, date_end, price, is_member, onRegistration}) {
    const onRegistrationClick = ()=> {
        onRegistration && onRegistration({uid, name, description, date_start, date_end, price});
    };
    return (
        <Col className="activity-item" md={12}>
            <Title level={2}>{name}</Title>
            <div className="activity-item__cover"
                 style={{backgroundImage: `url(${_service.url()}activity/cover?uid=${uid})`}}>
                    { is_member && <div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                        <div><CheckSquareOutlined /></div>
                    </div> }
            </div>
            <Row justify="space-around" align="middle">
                <Col md={12}>
                <p>
                    <strong>
                        {DateFormatter.days(date_start, date_end)} dias por apenas:
                        <span className="activity-item__price">&nbsp;R$ {price}</span>
                    </strong>
                </p>
                De {DateFormatter.toText(date_start)} até {DateFormatter.toText(date_end)}.
                </Col>
                <Col md={12}>
                    <p><Link type="link" target="_blank" href={`${_service.url()}activity/itinerary?uid=${uid}`}>Ver Roteiro Completo</Link></p>
                    { is_member
                        ? <b>Contamos com você!</b>
                        : <Button type="primary" onClick={onRegistrationClick}>Quero Participar!</Button>
                    }
                </Col>
            </Row>
            <div dangerouslySetInnerHTML={{__html:description}} />
        </Col>
    );
}

export default Item;