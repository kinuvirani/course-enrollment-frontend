import React, {useState} from "react";
import { Button, Form, Input } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {useMessageContext} from "../../contexts/MessageProvider.jsx";
import {studentRegistration} from "../../store/slices/authSlice.js"
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const [loading, setLoading] = useState(false);
    const messageApi = useMessageContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const actionResult = await dispatch(studentRegistration(values));
            if (actionResult?.error) {
                throw new Error(actionResult.payload);
            }
            messageApi.success(actionResult.payload.message);
            navigate('/login');
        } catch (error) {
            messageApi.error(error.message || "An error occur during registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Form
                name="userForm"
                onFinish={onFinish}
                initialValues={{
                    language: 'English',
                }}
                layout="vertical"
            >
                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Full Name"
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        className="signin-button"
                        loading={loading}
                    >
                        {loading ? 'Registering...' : 'Registration'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Registration;