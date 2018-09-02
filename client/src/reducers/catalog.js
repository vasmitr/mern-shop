import { FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_ERROR, FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from "../actionTypes";

const initialState = {
  categories: {
    items: [],
    loading: false,
    ok: true,
    errors: {}
  },
  products: {
    items: [],
    loading: false,
    ok: true,
    errors: {}
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true
        }
      }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          items: action.payload,
          loading: false
        }
      }
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        categories: {
          loading: false,
          ok: false,
          errors: action.payload
        }
      }
      case FETCH_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true
        }
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          items: action.payload,
          loading: false
        }
      }
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        products: {
          loading: false,
          ok: false,
          errors: action.payload
        }
      }
    default:
      return state;
  }
}