import {Alert, Card, Col, Row, Spin, Typography} from "antd";

import "./index.less";
import {useEffect, useState} from "react";
import _service from "@netuno/service-client";
import globalNotification from "../../../common/globalNotification.js";
import DateFormatter from "../../../common/DateFormatter.js";
import {InfoCircleOutlined} from "@ant-design/icons";

const { Title } = Typography;

function Payments() {
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        _service({
            url: 'payment/list',
            success: ({json}) => {
                setLoading(false);
                setPayments(json);
            },
            fail: (error) => {
                setLoading(false);
                console.error(error);
                globalNotification.serviceFail({
                    message: 'Pagamentos',
                    description: 'Não foi possível listar os pagamentos, tente novamente mais tarde.',
                });
            }
        });
    }, []);
    return (
        <section className="payments">
            <Title level={1}>Pagamentos</Title>
            <div>
                <p>O estado dos pagamentos das prestações em andamento e o seu histórico.</p>
            </div>
            <div style={{marginTop: '20px'}}>
                {loading && <Spin size="large"/>}
                { payments.length === 0 && <>
                    <Alert title={`Ainda não participa de alguma atividade.`} type="warning" showIcon />
                </>}
                { payments.length > 0 && payments.map(({activity_name, activity_date_start, activity_date_end, activity_price, due_date, amount, installment_number, installments_total, paid_on, paid}) => (
                    <Card title={activity_name +' - '+ DateFormatter.days(activity_date_start, activity_date_end) +' dias'} style={{marginBottom: '20px'}}>
                        <Row style={{marginBottom: '20px'}}>
                            <Col span={8}>
                                Prestação:<br/><b>{installment_number}/{installments_total}</b>
                            </Col>
                            <Col span={8}>
                                Vencimento:<br/><b>{DateFormatter.toFullText(due_date)}</b>
                            </Col>
                            <Col span={8}>
                                Valor:<br/><b>R$ {amount}</b>
                            </Col>
                        </Row>
                        {!paid && <Alert title={`Aguardando confirmação do pagamento.`} type="warning" showIcon />}
                        {paid && <Alert title={<span>Pagamento realizado em <b>{DateFormatter.toFullText(paid_on)}</b>.</span>} type="success" showIcon />}
                        <Card style={{marginTop: '20px'}}>
                            <div style={{marginBottom: '10px'}}><InfoCircleOutlined /> Detalhes da Atividade</div>
                            <Row>
                                <Col span={8}>
                                    Partida:<br/><i>{DateFormatter.toFullText(activity_date_start)}</i>
                                </Col>
                                <Col span={8}>
                                    Chegada:<br/><i>{DateFormatter.toFullText(activity_date_end)}</i>
                                </Col>
                                <Col span={8}>
                                    Valor Total:<br/><i>R$ {activity_price}</i>
                                </Col>
                            </Row>
                        </Card>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default Payments;