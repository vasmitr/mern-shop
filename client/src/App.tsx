import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import LoginModal from './components/auth/LoginModal';
import configureStore from "./redux/configureStore";

const store = configureStore();


const App: React.FC = () => (
    <Provider store={ store }>
        <Layout>
            <LoginModal />
        </Layout>
    </Provider>
);

export default App;
