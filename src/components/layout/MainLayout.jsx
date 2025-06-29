import React from 'react';
import { Layout } from 'antd';
const { Content} = Layout;

import AppHeader from "./AppHeader.jsx";
import AppFooter from "./AppFooter.jsx";
import {Outlet} from "react-router-dom";


const MainLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ padding: '24px', background: '#fff' }}>
                <Outlet />
            </Content>
            <AppFooter />
        </Layout>
    );
};
export default MainLayout;