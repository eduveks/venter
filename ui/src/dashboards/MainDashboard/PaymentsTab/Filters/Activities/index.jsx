import {useEffect, useState} from "react";
import {notification, Select} from "antd";
import _service from "@netuno/service-client";

function Activities(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    _service({
      url: 'admin/activity/list',
      start: ()=> {
        setLoading(true);
      },
      success: ({json}) => {
        setData(json);
      },
      fail: (error) => {
        console.error(error);
        notification.error({
          message: 'Filtro das Atividades',
          description: 'Não foi possível listar as atividades para o filtro de pagamentos.',
        });
      },
      end: ()=> {
        setLoading(false);
      },
    })
  }, []);

  return (
    <Select {...props} allowClear={true} loading={loading} showSearch={{
        filterOption: (input, option) =>
          (option?.label ?? '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            .includes(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()),
      }}
      options={data.map(({uid, name, category}) => {
        return { value: uid, label: (category.parent ? category.parent +' > ': '') + category.name +' > '+ name };
      } )}
    />
  );
}

export default Activities;