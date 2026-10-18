import {useEffect, useState} from "react";
import {notification, Select} from "antd";
import _service from "@netuno/service-client";

function People(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    _service({
      url: 'admin/people/list',
      start: ()=> {
        setLoading(true);
      },
      success: ({json}) => {
        setData(json);
      },
      fail: (error) => {
        console.error(error);
        notification.error({
          message: 'Filtro das Pessoas',
          description: 'Não foi possível listar as pessoas para o filtro de pagamentos.',
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
            options={data.map(({uid, name, group}) => {
              return { value: uid, label: group +' > '+ name };
            } )}
    />
  );
}

export default People;