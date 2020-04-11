import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer, {RootState} from './reducers'

export default function configureStore () {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = applyMiddleware(sagaMiddleware);

    const enhancers = composeWithDevTools(middlewares);

    return createStore(rootReducer, {} as RootState, enhancers);
}

