import {Form, DatePicker, InputNumber, Row, Col} from "antd";
import Activities from "./Activities";
import Status from "./Status";
import People from "./People/index.jsx";

const {RangePicker} = DatePicker;

function Filters({ onChange }) {
  const onValuesChange = (changedValues, $allValues) => {
    const allValues = {...$allValues}
    if (onChange) {
      if (Array.isArray(allValues.interval)) {
        allValues.interval = [...allValues.interval];
        [0, 1].forEach(i => {
          if (allValues.interval.length > i && typeof(allValues.interval[i]) == "object") {
            allValues.interval[i] = allValues.interval[i].format("YYYY-MM-DD");
          }
        });
      }
      onChange(allValues);
    }
  };
  return (
    <Form layout="vertical" autoComplete="off" onValuesChange={onValuesChange}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="activity" label="Atividade">
            <Activities />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="Estado">
            <Status />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="installment" label="Prestação">
            <InputNumber min={0} max={24} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="people_id" label="Pessoa">
            <People />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="interval" label="Intervalo de Datas">
            <RangePicker />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Filters;
