import React from 'react';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import LoginModal from './components/auth/LoginModal';


const App: React.FC = () => (
    <Layout>
        <LoginModal />
    </Layout>
);

export default App;
