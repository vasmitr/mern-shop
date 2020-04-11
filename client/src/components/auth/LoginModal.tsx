import axios from 'axios';
import * as React from 'react';
import {
    Button, Form, Input, Modal,
} from 'antd';
import { useDispatch } from 'react-redux';
import {
    loginFailureAction,
    loginRequestAction,
    loginSuccessAction
} from "../../redux/actions/loginActions";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const LoginModal: React.FC = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
        { target: { name, value } },
    ): void => setFormData({ ...formData, [name]: value });

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        dispatch(loginRequestAction());
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/users/login', formData);
            dispatch(loginSuccessAction({
                token: res.data.token,
                username: formData.email
            }));
        } catch (e) {
            dispatch(loginFailureAction(e.response.data.email));
        }
    };


    const {
        email, password,
    } = formData;

    return (
        <Modal visible title="Log In" centered footer={null}>
            <Form {...formItemLayout}>
                <Form.Item>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;
