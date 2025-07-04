import React from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import {TeamOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {globalResetAll} from "../../store/commonAction.js";

function getItem (label, key, icon, children) {
    return {
        label,
        key,
        icon,
        children
    }
}

const AppHeader = () => {

    const token = useSelector((state) => state.auth?.student?.data?.token);
    const name = useSelector((state) => state.auth?.student?.data?.name);
    const dispatch = useDispatch();

    const items = token ? [
        getItem(name || 'User', 'user', <UserOutlined />, [
            getItem('My Enrollments', 'enrollments'),
            getItem('Logout', 'logout', <LogoutOutlined />)
        ]),
    ] : [
        getItem('Registration', 'registration', <UserOutlined />),
        getItem('Login', 'login', <TeamOutlined />)
    ];

    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        switch (e.key) {
            case 'registration':
                navigate('/registration');
                break;
            case 'login':
                navigate('/login');
                break;
            case 'logout':
                handleLogout();
                break;
            case 'enrollments':
                navigate('/enrollments');
                break;
            default:
                navigate('/login');
                break;
        }
    }


    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(globalResetAll());
        navigate('/login');
    }

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
                onClick={handleMenuClick}
                style={{
                    display: 'flex',
                    width: '30%',
                    justifyContent: 'end',
                    position: 'absolute', top: 0, right: 0  }}
            />
        </Header>
    );
};
export default AppHeader;