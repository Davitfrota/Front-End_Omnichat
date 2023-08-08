import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  POST_ADD_ORDER_SUCCESS,
  POST_ADD_ORDER_FAIL,
  PUT_UPDATE_ORDER_SUCCESS,
  PUT_UPDATE_ORDER_FAIL
} from "./actionTypes"

const INIT_STATE = {
  orders: [],
  error: [],
  loading: false,
}

const OrderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case POST_ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
      }

    case POST_ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PUT_UPDATE_ORDER_SUCCESS:
      const updatedOrder = action.payload;
      const orders = state.orders.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      return {
        ...state,
        orders: orders,
        loading: false,
      };

    case PUT_UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return {...state, loading: false}
  }
}

export default OrderReducer
