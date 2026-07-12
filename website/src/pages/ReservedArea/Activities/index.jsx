import {Row, Typography, Spin} from "antd";
import {useEffect, useState} from "react";
import _service from "@netuno/service-client";
import Item from "./Item";

import "./index.less";
import globalNotification from "../../../common/globalNotification.js";
import MemberRegistration from "./MemberRegistration/index.jsx";

const { Title } = Typography;

function Activities({type}) {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [registrationActivity, setRegistrationActivity] = useState(true);
    useEffect(() => {
        loadList();
    }, [type]);
    useEffect(() => {
        window.scroll(0, scrollTop);
    }, [activities]);
    const loadList = () => {
        setScrollTop(window.scrollY);
        setLoading(true);
        setActivities([]);
        _service({
            method: 'GET',
            url: '/activity/list',
            data: {type},
            success: ({json}) => {
                setLoading(false);
                setActivities(json);
            },
            fail: (error) => {
                setLoading(false);
                console.error(error);
                globalNotification.serviceFail({
                    message: 'Atividades',
                    description: 'Não foi possível listar as atividades, tente novamente mais tarde.',
                });
            }
        });
    };
    const onRegistration = (activity) => {
        setRegistrationActivity(activity);
    };
    const onRegistrationClose = (finished) => {
        setRegistrationActivity(null);
        if (finished) {
            loadList();
        }
    }
    return (
        <section className="activities">
            <Title level={1}>
                {type === "academic" && "Atividades Acadêmicas"}
                {type === "tourism" && "Atividades Turísticas"}
            </Title>
            <div>
                <p>Aqui encontra as nossas atividades que estão ativas no momento, garanta já o seu lugar.</p>
            </div>
            {loading && <Spin size="large"/>}
            <MemberRegistration {...registrationActivity} onClose={onRegistrationClose} />
            <Row gutter={[40, 40]} style={{marginTop: '40px'}}>
                {!loading && activities.map((activity) => (
                    <Item key={activity.uid} {...activity} onRegistration={onRegistration}></Item>
                ))}
            </Row>
        </section>
    );
}

export default Activities;