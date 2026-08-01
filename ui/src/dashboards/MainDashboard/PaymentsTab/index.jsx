import {useEffect, useState} from "react";
import _service from "@netuno/service-client";
import {Alert, Card, Col, notification, Row, Spin, Typography} from "antd";
import $ from "jquery";
import DateFormatter from "../../../common/DateFormatter.js";

const {Title} = Typography;

function PaymentsTab({}) {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    _service({
      method: "POST",
      url: 'admin/payment/list',
      success: ({json}) => {
        setLoading(false);
        setPayments(json);
      },
      fail: (error) => {
        setLoading(false);
        console.error(error);
        notification.error({
          message: 'Pagamentos',
          description: 'Não foi possível listar os pagamentos, tente novamente mais tarde.',
        });
      }
    });
  }, []);
  return (
    <section className="payments">
      <Title level={1}>Pagamentos</Title>
      <div style={{marginTop: '20px'}}>
        {loading && <Spin size="large"/>}
        { payments.length === 0 && <>
          <Alert title={`Ainda não participa de alguma atividade.`} type="warning" showIcon />
        </>}
        { payments.length > 0 && payments.map(({people_name, activity_name, activity_date_start, activity_date_end, activity_price, due_date, amount, installment_number, installments_total, paid_on, paid}) => (
          <Card title={people_name} style={{marginBottom: '20px'}} onClick={(e)=> {$(e.target).fadeOut().fadeIn();}}>
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
              <div style={{marginBottom: '10px'}}>{activity_name} - {DateFormatter.days(activity_date_start, activity_date_end)} dias</div>
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

export default PaymentsTab;
