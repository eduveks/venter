import {Tabs} from 'antd';

import PaymentsTab from "./PaymentsTab";
import ConfigurationTab from "./ConfigurationTab";

import "./index.less";

function MainDashboard() {
  return (
    <div className="main-dashboard">
      <Tabs items={[
        {
          key: '1',
          label: 'Pagamentos',
          children: <PaymentsTab />
        },
        {
          key: '2',
          label: 'Configurações',
          children: <ConfigurationTab />
        }
      ]} />
    </div>
  );
}

export default MainDashboard;