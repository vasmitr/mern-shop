import { createAction } from "../helpers";
import { LoginData } from "../reducers/loginReducer";

export const loginRequestAction = createAction('LOGIN_REQUEST');

export const loginSuccessAction = createAction<LoginData, 'LOGIN_SUCCESS'>('LOGIN_SUCCESS');

export const loginFailureAction = createAction<string, 'LOGIN_FAILURE'>('LOGIN_FAILURE');