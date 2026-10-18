import React from "react";
import { createRoot } from 'react-dom/client';

import _service from "@netuno/service-client";

import { ConfigProvider, theme } from "antd";
import antLocale_ptBR from "antd/lib/locale/pt_BR";

import MainDashboard from "./dashboards/MainDashboard";

_service.config({
    prefix: netuno.config.urlServices
});

const dashboardMainDiv = createRoot(document.getElementById("app-dashboard-main"));

if (dashboardMainDiv) {
  dashboardMainDiv.render(
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2B046E',
          colorLink: '#2B046E',
          borderRadius: 5,
        },
        algorithm: theme.defaultAlgorithm
      }}
      locale={antLocale_ptBR}
    >
      <MainDashboard />
    </ConfigProvider>
  );
}

netuno.addNavigationLoad(() => {
    $('[netuno-navigation]').find('a').on('netuno:click', (e)=> {
        const link = $(e.target);
        if (dashboardMainDiv && link.is('[netuno-navigation-dashboard]')) {
            // Menu > Dashboard > Clicked!
        }
    });
});

netuno.addContentLoad((container) => {
    // When any content is loaded dinamically this is executed...
    if (container.is('[netuno-form-search="YOUR_FORM_NAME"]')) {
        // When search page is loaded...
    } else if (container.is('[netuno-form-edit="YOUR_FORM_NAME"]')) {
        // When form edit is loaded...
    }
});

netuno.addPageLoad(() => {
    // When page is loaded...
    let modal = $('#app-dashboard-modal-form');
    modal.on('hidden.bs.modal', ()=> {
        modal.find('[netuno-form-edit]').empty();
    });
    $('#app-dashboard-modal-form-button').on('click', ()=> {
        modal.modal('show');
        netuno.loadFormEdit(modal.find('[netuno-form]'));
    });
    modal.find('[netuno-form]').on('netuno:save', ()=> {
        modal.modal('hide');
    });
});


