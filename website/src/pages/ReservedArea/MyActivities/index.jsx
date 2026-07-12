import {Alert, Card, Col, Row, Spin, Typography} from "antd";

import "./index.less";
import {useEffect, useState} from "react";
import _service from "@netuno/service-client";
import globalNotification from "../../../common/globalNotification.js";
import DateFormatter from "../../../common/DateFormatter.js";
import {InfoCircleOutlined} from "@ant-design/icons";
import Item from "./Item/index.jsx";

const { Title } = Typography;

function MyActivities() {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        _service({
            url: 'activity/my/list',
            success: ({json}) => {
                setLoading(false);
                setActivities(json);
            },
            fail: (error) => {
                setLoading(false);
                console.error(error);
                globalNotification.serviceFail({
                    message: 'Minhas Atividades',
                    description: 'Não foi possível listar as minhas atividades, tente novamente mais tarde.',
                });
            }
        });
    }, []);
    return (
        <section className="my-activities">
            <Title level={1}>Minhas Atividades</Title>
            <div>
                <p>Todas as atividades que fez a inscrição ou que já participou.</p>
            </div>
            <div style={{marginTop: '20px'}}>
                {loading && <Spin size="large" />}
                { activities.length === 0 && <>
                    <Alert title={`Ainda não participa de alguma atividade.`} type="warning" showIcon />
                </>}
                { activities.length > 0 && activities.map((activity) => (
                    <Item key={activity.uid} {...activity} />
                ))}
            </div>
        </section>
    );
}

export default MyActivities;