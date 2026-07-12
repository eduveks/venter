import _auth from "@netuno/auth-client";
import { GrMoney, GrHistory } from "react-icons/gr";
import { HiAcademicCap } from "react-icons/hi2";
import { GiPalmTree } from "react-icons/gi";
import { PiMapPinAreaFill } from "react-icons/pi";
import {MenuOutlined} from "@ant-design/icons";
import {Menu, Layout} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

import "./index.less";

const { Sider } = Layout;

const menuItems = [
    {
        key: "dashboard",
        label: "Principal",
        icon: <PiMapPinAreaFill/>,
        link: "/dashboard"
    },
    {
        type: 'group',
        label: "Atividades",
        children: [
            {
                key: "academic",
                label: "Acadêmicas",
                icon: <HiAcademicCap/>,
                link: "/academic"
            },
            {
                key: "tourism",
                label: "Turísticas",
                icon: <GiPalmTree/>,
                link: "/tourism"
            },
        ]
    },
    {
        type: 'divider'
    },
    {
        key: "payment",
        label: "Pagamentos",
        icon: <GrMoney />,
        link: "/payments"
    },
    {
        key: "my-activities",
        label: "Minhas Atividades",
        icon: <GrHistory />,
        link: "/my-activities"
    },
];

function SiderMenu({collapsed, onCollapse}) {
    const [selectedMenuKeys, setSelectedMenuKeys] = useState(["dashboard"]);
    const [sideMenuMobileMode, setSideMenuMobileMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const menuItem = menuItems
            .flatMap((i) => (!!i.children && i.children) || i)
            .find((i) => i.link === location.pathname);
        if (menuItem) {
            setSelectedMenuKeys([menuItem.key]);
        } else {
            setSelectedMenuKeys([]);
        }
    }, [location])
    function onMenuClick(e) {
        const menuItem = menuItems
            .flatMap((i) => (!!i.children && i.children) || i)
            .find((i) => i.key === e.key);
        if (menuItem) {
            setSelectedMenuKeys([menuItem.key]);
            navigate(menuItem.link);
        }
    }
    return (
        <>
            {_auth.isLogged() &&
                <Sider
                    onBreakpoint={mobile => {
                        setSideMenuMobileMode(mobile);
                    }}
                    collapsedWidth={sideMenuMobileMode ? '0' : '80'}
                    breakpoint={"md"}
                    width={250}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={onCollapse}
                    trigger={<MenuOutlined />}
                    className="sider-menu"
                >
                    <div className="logo-container"><img alt="logo" src="/images/logo.svg" /></div>
                    <Menu
                        onClick={onMenuClick}
                        selectedKeys={selectedMenuKeys}
                        mode="inline"
                        items={menuItems}
                    />
                </Sider>
            }
        </>
    );
}

export default SiderMenu;