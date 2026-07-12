import {Button, Col, Row, Typography} from "antd";

import _service from "@netuno/service-client";

import DateFormatter from "../../../../common/DateFormatter.js";

import { CheckSquareOutlined } from "@ant-design/icons";

import "./index.less";

const {Title, Link} = Typography;

function Item({category_name, uid, name, description, date_start, date_end, price, member_since}) {
    return (
        <div className="my-activity-item">
            <Title level={2}>{name}</Title>
            Categoria: <b>{category_name}</b>
            <div className="my-activity-item__cover"
                 style={{backgroundImage: `url(${_service.url()}activity/cover?uid=${uid})`}}>
                    <div>
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
                    </div>
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
                    <p><Link target="_blank" href={`${_service.url()}activity/itinerary?uid=${uid}`}>Ver Roteiro Completo.</Link></p>
                    Incrição feita em <b>{DateFormatter.toText(member_since)}</b>.
                </Col>
            </Row>
            <div dangerouslySetInnerHTML={{__html:description}} />
        </div>
    );
}

export default Item;