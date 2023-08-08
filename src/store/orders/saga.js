import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_ORDERS,
  POST_ADD_ORDER,
  PUT_UPDATE_ORDER,
  DELETE_ORDER,
} from "./actionTypes";

import {
  getOrdersSuccess,
  getOrdersFail,
  addOrderSuccess,
  addOrderFail,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,

} from "./actions";

import { getOrders, addOrder, updateOrder, deleteOrder } from './api';

function* onGetOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}


function* onAddOrder({ order }) {
  try {
    const response = yield call(addOrder, order);
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFail(error));
  }
}

function* onUpdateOrder({ order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ orderId }) {
  try {
    const response = yield call(deleteOrder, orderId);
    yield put(deleteOrderSuccess(response));
  } catch (error) {
    yield put(deleteOrderFail(error));
  }
}


function* orderSaga() {
  yield takeLatest(GET_ORDERS, onGetOrders);
  yield takeEvery(POST_ADD_ORDER, onAddOrder);
  yield takeEvery(PUT_UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
}

export default orderSaga;
