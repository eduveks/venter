import React from "react";

import {Typography, Tag, Flex, Alert, Row, Col, Card, Button} from 'antd';

import "./index.less";
import {Link} from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;

function Home() {
  return (
    <div className="home-container">
      <Row>
        <Col md={12}>
          <p>Somos uma agência de viagens especializada em excursões e experiências educacionais, criada para aproximar o que se aprende daquilo que se vive.</p>
          <p>Acreditamos que uma viagem pode ser muito mais do que sair da escola. Pode ser o momento de ver a ciência acontecendo, encontrar a história fora dos livros, experimentar novas culturas, descobrir a natureza, conhecer pessoas e voltar para casa com novas perguntas.</p>

          <p>Por isso, cada experiência Venter nasce com propósito: transformar destinos em oportunidades de aprendizagem, descoberta e conexão.</p>
          <p>E enquanto os alunos vivem tudo isso, nós cuidamos do caminho para que a escola tenha uma experiência planejada, organizada e segura.</p>
          <p>🚌 Escolas, professores, empresas e famílias: sejam bem-vindos.</p>
          <p><strong>Somos Venter.</strong></p>
          <p>
          Experiências que levam o aprendizado mais longe.<br/>
          📍 Sorocaba/SP
          </p>
          <p>Viagens que levam o aprendizado mais longe.</p>
          <Flex gap="small" align="center" wrap>
            <Tag color="blue">Ciência</Tag>
            <Tag color="orange">Cultura</Tag>
            <Tag color="green">Natureza</Tag>
            <Tag color="purple">Pessoas</Tag>
            <Tag color="cyan">Ideias</Tag>
          </Flex>
          <p>Um mundo de possibilidades.</p>
          <Alert type="info" title="Mais mundo para novos amanhãs." />
        </Col>
        <Col md={12}>
          <img className="image" src={"/images/sider-login.png"} />
        </Col>
      </Row>
      <p>
        Se inscreva na nossa plataforma e participe das nossas experiências:
      </p>
      <Link to="/login"><Button type={"primary"}>Entrar</Button></Link>
      <Row gutter={[20, 20]} style={{marginTop: '20px'}}>
        <Col lg={8}>
          <Card title="Experiências">
            <Meta title="Descobrir também é aprender." description="Novos lugares despertam curiosidade, ampliam horizontes e tornam o aprendizado real." />
          </Card>
        </Col>
        <Col lg={8}>
          <Card title="Aprendizagem">
            <Meta title="Viver é entender diferente." description="Na prática, os conteúdos ganham significado, conectando teoria, realidade e pessoas." />
          </Card>
        </Col>
        <Col lg={8}>
          <Card title="Planejamento">
            <Meta description="Cuidamos de cada detalhe para que sua escola viva experiências seguras, organizadas e inesquecíveis." />
            <Flex gap="small" align="center" wrap style={{marginTop: '20px'}}>
              <Tag color="blue">Observar</Tag>
              <Tag color="orange">Conectar</Tag>
              <Tag color="green">Viver</Tag>
              <Tag color="purple">Transformar</Tag>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;