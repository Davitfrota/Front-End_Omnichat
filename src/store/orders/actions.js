import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  POST_ADD_ORDER,
  POST_ADD_ORDER_SUCCESS,
  POST_ADD_ORDER_FAIL,
  PUT_UPDATE_ORDER,
  PUT_UPDATE_ORDER_SUCCESS,
  PUT_UPDATE_ORDER_FAIL,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL
} from "./actionTypes"

export const getOrders = () => ({
  type: GET_ORDERS,
})

export const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
})

export const getOrdersFail = error => ({
  type: GET_ORDERS_FAIL,
  payload: error,
})

export const addOrder = order => ({
  type: POST_ADD_ORDER,
  order,
})

export const addOrderSuccess = order => ({
  type: POST_ADD_ORDER_SUCCESS,
  payload: order,
})

export const addOrderFail = error => ({
  type: POST_ADD_ORDER_FAIL,
  payload: error,
})

export const updateOrder = orderData => ({
  type: PUT_UPDATE_ORDER,
  orderData,
})

export const updateOrderSuccess = order => ({
  type: PUT_UPDATE_ORDER_SUCCESS,
  payload: order,
})

export const updateOrderFail = error => ({
  type: PUT_UPDATE_ORDER_FAIL,
  payload: error,
})

export const deleteOrder = orderId => ({
  type: DELETE_ORDER,
  orderId,
})

export const deleteOrderSuccess = orderId => ({
  type: DELETE_ORDER_SUCCESS,
  payload: orderId,
})

export const deleteOrderFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})
