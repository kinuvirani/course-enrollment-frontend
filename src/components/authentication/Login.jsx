import {Button, Form, Input} from "antd";
import {MailOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {studentLogin} from '../../store/slices/authSlice.js'
import {useDispatch} from "react-redux"
import {useMessageContext} from "../../contexts/MessageProvider.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const messageApi = useMessageContext();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const actionResult = await dispatch(studentLogin(values));
            if (actionResult?.error) {
                throw new Error(actionResult.payload);
            }
            messageApi.success(actionResult.payload.message);
            localStorage.setItem('token', actionResult.payload?.data?.token);
            navigate('/');
        } catch (error) {
            messageApi.error(error.message || 'An error occurred during login');
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
                        {loading ? 'Logged in...' : 'Login'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;