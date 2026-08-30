import {useState, useEffect, useRef} from "react";

import {Form, Input, Button, notification} from "antd";

import "./index.less";
import _service from "@netuno/service-client";

function Item({title, type, description}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(()=> {
    _service({
      method: "GET",
      url: "admin/email/template",
      data: {
        type
      },
      start: ()=> {
        setLoading(true);
      },
      success: ({json})=> {
        form.setFieldsValue({content: json.content});
      },
      fail: (error)=> {
        console.error(error);
        notification.error({
          title,
          description: 'Não foi possível carregar o conteúdo, tente novamente mais tarde.',
        });
      },
      end: ()=> {
        setLoading(false);
      }
    });
  }, []);
  const onFinish = ({content}) => {
    _service({
      method: "POST",
      url: "admin/email/template",
      data: {
        type,
        content
      },
      start: ()=> {
        setLoading(true);
      },
      success: ()=> {
        notification.success({
          title,
          description: 'O conteúdo foi salvo com sucesso.',
        });
      },
      fail: (error)=> {
        console.error(error);
        notification.error({
          title,
          description: 'Não foi possível salvar o conteúdo, tente novamente mais tarde.',
        });
      },
      end: ()=> {
        setLoading(false);
      }
    });
  };
  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label={title} name="content" help={description}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" htmlType="submit" loading={loading}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Item;
