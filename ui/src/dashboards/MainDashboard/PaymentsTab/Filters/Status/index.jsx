import {Select} from "antd";

function Status(props) {
  return (
    <Select {...props} allowClear={true} showSearch={{
        filterOption: (input, option) =>
          (option?.label ?? '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            .includes(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()),
      }}
      options={[
        { label: "Aguardando", value: "waiting"},
        { label: "Em Atraso", value: "overdue"},
        { label: "Pago", value: "paid"},
      ]}
    />
  );
}

export default Status;