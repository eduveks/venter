import { Typography } from 'antd';

import _service from "@netuno/service-client";

import "./index.less";
import Item from "./Item/index.jsx";

const {Title} = Typography;

function EmailTemplates({}) {
    return (
        <div className="email-templates">
            <Title level={4}>E-mail Templates</Title>
            <div className="email-templates__item">
              <Item title="Boas Vindas" type="welcome" description="Quando o usuário faz o registro." />
              <Item title="Registro de Membro" type="member-registration" description="Quando é feito o cadastro em uma atividade." />
              <Item title="Alerta para Pagamento" type="payment-alert" description="Lembrar que tem que fazer o pagamento, enviado 3 dias antes da data de pagamento." />
              <Item title="Pagamento em Atraso" type="payment-delay" description="Lembra que o pagamento está atrasado, enviado quando passa 3 dias e o pagamento ainda não foi feito." />
              <Item title="Lembrete da Atividade" type="activity-reminder" description="Reforça que a atividade vai iniciar, enviado 3 dias antes de iniciar a atividade." />
            </div>
        </div>
    )
}

export default EmailTemplates;
