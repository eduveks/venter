import React, {useEffect, useState} from 'react';

import {Typography, Spin, Row, Col, Alert, Card} from 'antd';

import { connect } from 'react-redux';

import './index.less';
import _service from "@netuno/service-client";
import globalNotification from "../../../common/globalNotification.js";
import DateFormatter from "../../../common/DateFormatter.js";
import {InfoCircleOutlined} from "@ant-design/icons";

const { Title } = Typography;

function Dashboard({loggedUserInfo}) {
  const [payment, setPayment] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  useEffect(() => {
    if (!loggedUserInfo) {
      return;
    }
    _service({
      method: 'GET',
      url: 'payment/next',
      start: () => {
        setPaymentLoading(true);
      },
      success: ({json}) => {
        setPayment(json);
      },
      fail: (error) => {
        console.error(error);
        globalNotification.serviceFail({
          message: 'Participar',
          description: 'Não foi possível fazer a inscrição, tente novamente mais tarde.',
        });
      },
      end: () => {
        setPaymentLoading(false);
      },
    });
  }, [loggedUserInfo]);
  let content = null;
  if (!loggedUserInfo) {
    content = <Spin/>;
  } else {
    content = (
      <>
        <Title level={1}>Olá {loggedUserInfo.name}</Title>
        {paymentLoading && <Spin />}
        {payment != null &&
            <>
              <p>Lembre-se da próxima prestação:</p>
              <Card title={payment.activity_name +' - '+ DateFormatter.days(payment.activity_date_start, payment.activity_date_end) +' dias'} style={{marginBottom: '20px'}}>
                <Row style={{marginBottom: '20px'}}>
                  <Col span={8}>
                    Prestação:<br/><b>{payment.installment_number}/{payment.installments_total}</b>
                  </Col>
                  <Col span={8}>
                    Vencimento:<br/><b>{DateFormatter.toFullText(payment.due_date)}</b>
                  </Col>
                  <Col span={8}>
                    Valor:<br/><b>R$ {payment.amount}</b>
                  </Col>
                </Row>
                <Alert title={`Aguardando confirmação do pagamento.`} type="warning" showIcon />
              </Card>
            </>
        }
        <p>Participe das nossas atividades especiais, explore e encontre a viagem ideal.</p>
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={12}>
            <div className="dashboard-activity-card">
              <Title level={2}>Atividades Acadêmicas</Title>
              <p>Participe das nossas atividades especiais, explore e encontre a viagem ideal.</p>
              <img src={"/images/academic-image.jpg"} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="dashboard-activity-card">
              <Title level={2}>Atividades Turísticas</Title>
              <p>Participe das nossas atividades especiais, explore e encontre a viagem ideal.</p>
              <img src={"/images/tourism-image.jpg"} />
            </div>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <div className="dashboard-layout-content">
      {content}
    </div>
  );
}

const mapStateToProps = store => {
  const { loggedUserInfo } = store.loggedUserInfoState;
  return {
    loggedUserInfo
  };
};

export default connect(mapStateToProps, {})(Dashboard);

