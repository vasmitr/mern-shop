import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../actionTypes'

const initialState = {
  loading: false,
  ok: true,
  user: {
    name: '',
    email: '',
    password: '',
    password2: ''
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        ok: true,
        user: action.payload
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        ok: false,
        user: action.payload
      };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          ok: true,
          user: action.payload
        };
      case LOGIN_ERROR:
        return {
          ...state,
          loading: false,
          ok: false,
          user: action.payload
        };
    default: 
      return state
  }
}