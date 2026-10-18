import React, { useEffect, useState } from "react";
import { Routes as Switch, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

import {ConfigProvider, Layout, notification} from 'antd';
import antLocale_ptPT from 'antd/lib/locale/pt_PT';

import { Provider } from 'react-redux';
import { Store } from './redux/store';

import classNames from 'classnames';

import _auth from '@netuno/auth-client';
import './common/Config';

import HeaderBase from './base/HeaderBase';
import SiderMenu from "./base/SiderMenu";
import FooterBase from "./base/FooterBase";

import LoginPage from './pages/Login';
import Register from './pages/Register';
import LoginCallback from './pages/LoginCallback';
import RegisterCallback from './pages/RegisterCallback';
import Recovery from './pages/Recovery';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ReservedArea from "./pages/ReservedArea";

import globalNotification from "./common/globalNotification.js";

import './styles/App.less';

const { Content } = Layout;

const NavWithAuthCheck = () => {
  if (_auth.isLogged()) {
    return (
      <Navigate to="/reserved-area" />
    );
  }
  return(
    <Navigate to="/login" />
  );
};

export default function App() {
  const [headerButtonMode, setHeaderButtonMode] = useState('login');
  const [collapsed, setCollapsed] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    _auth.config({
      onLogout: () => {
        navigate('/login');
      }
    });
  }, []);

  useEffect(() => {
    globalNotification.api(api);
  }, [api]);

  useEffect(() => {
    setHeaderButtonMode(location.pathname);
  }, [location]);

  function onCollapse() {
    setCollapsed(!collapsed);
  }

  return (
    <ConfigProvider
      locale={antLocale_ptPT}
      theme={{
        token: {
          colorPrimary: '#2B046E',
          colorLink: '#2B046E',
          fontSize: 16,
          borderRadius: 20,
          primaryColor: '#2B046E',
          colorBgBase: '#eff8ff',
          colorBgLayout: '#ffffff',
          colorBgMask: 'rgba(43, 4, 110, 0.75)',
          colorTextHeading: '#2B046E',
        },
        components: {
          Button: {
            primaryColor: '#FEBF34',
          },
          Layout: {
            headerBg: '#f0f2f5',
            triggerBg: '#f0f2f5',
            triggerColor: null,
            siderBg: '#f0f2f5',
          },
          Menu: {
            colorBgElevated: '#f0f2f5',
            itemBg: '#f0f2f5',
            itemColor: null,
            itemSelectedColor: '#64149f',
          }
        },
      }}
    >
      <Provider store={Store}>
        <Layout className={'page ' + classNames({ 'auth ': _auth.isLogged() }) + classNames({ 'collapsed ': collapsed })}>
          <SiderMenu collapsed={collapsed} onCollapse={onCollapse} />
          <Layout>
            <HeaderBase collapsed={collapsed} headerButtonMode={headerButtonMode} />
            <Content className={classNames({ 'auth ': _auth.isLogged() })}>
              {contextHolder}
              <Switch>
                {/** PUBLIC **/}
                <Route exact path="/" element={<NavWithAuthCheck/>}/>
                <Route path="/login/:provider" element={<LoginCallback/>} />
                <Route path="/register/:provider" element={<RegisterCallback/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/recovery" element={<Recovery/>} />
                {/** // PUBLIC **/}
                {/** RESERVED AREA **/}
                <Route path="/dashboard" element={<ReservedArea />} />
                <Route path="/academic" element={<ReservedArea />} />
                <Route path="/tourism" element={<ReservedArea />} />
                <Route path="/payments" element={<ReservedArea />} />
                <Route path="/my-activities" element={<ReservedArea />} />
                {/** // RESERVED AREA **/}
                <Route path="*" element={<NotFound/>} />
              </Switch>
            </Content>
            <FooterBase />
          </Layout>
        </Layout>
      </Provider>
    </ConfigProvider>
  );
}
