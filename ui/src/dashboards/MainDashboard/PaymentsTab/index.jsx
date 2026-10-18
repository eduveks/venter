import {useState} from "react";
import {Divider} from "antd";
import List from "./List";
import Filters from "./Filters";

function PaymentsTab({}) {
  const [filters, setFilters] = useState({});
  const onFilterChange = (values) => {
    setFilters(values);
  };
  return (
    <section className="payments">
      <Divider titlePlacement="start" plain>Filtros</Divider>
      <Filters onChange={onFilterChange} />
      <List filters={filters} />
    </section>
  )
}

export default PaymentsTab;