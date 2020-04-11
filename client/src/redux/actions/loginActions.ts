import { createAction } from "../helpers";
import { LoginData } from "../reducers/loginReducer";

export const loginRequestAction = createAction('LOGIN_REQUEST')();

export const loginSuccessAction = createAction('LOGIN_SUCCESS')<LoginData>();

export const loginFailureAction = createAction('LOGIN_FAILURE')<string>();