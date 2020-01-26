import axios from 'axios';
import * as React from 'react';
import {
    Button, Form, Input, Modal,
} from 'antd';

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

const RegisterModal: React.FC = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
        { target: { name, value } },
    ): void => setFormData({ ...formData, [name]: value });

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/users/register', formData);
    };


    const {
        name, email, password, password2,
    } = formData;

    return (
        <Modal visible title="Sign Up" centered footer={null}>
            <Form {...formItemLayout}>
                <Form.Item>
                    <Input
                        type="name"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={handleChange}
                    />
                </Form.Item>
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
                    <Input
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        value={password2}
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

export default RegisterModal;
