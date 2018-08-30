import { REGISTER_USER, REGISTER_SUCESS, REGISTER_ERROR } from '../actionTypes'

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
    case REGISTER_SUCESS:
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
    default: 
      return state
  }
}