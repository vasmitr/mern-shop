import { fetchDataMixin } from '../helpers';
import { Actions } from '../actions';
import { loginRequestAction, loginSuccessAction, loginFailureAction } from '../actions/loginActions';


const loginData = {
    username: '',
    token: ''
};

const loginDefaultState = {
    ...fetchDataMixin,
    data: loginData
};

export type LoginData = typeof loginData;

export type LoginState = typeof loginDefaultState;

export default function (state: LoginState = loginDefaultState, action: Actions)  {
    switch (action.type) {
        case loginRequestAction.type:
            return {
                ...state,
                loading: true
            };
        case loginSuccessAction.type:
            return {
                ...state,
                success: true,
                loading: false,
                data: action.payload,
                error: ''
            };
        case loginFailureAction.type:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}