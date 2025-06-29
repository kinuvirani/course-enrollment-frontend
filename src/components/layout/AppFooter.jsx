import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by @Kiran
        </Footer>
    );
};
export default AppFooter;