import { takeEvery, put, call } from "redux-saga/effects";

// Chat Redux States
import {
  GET_CHATS,
  GET_CONTACTS,
  GET_GROUPS,
  GET_MESSAGES,
  POST_ADD_MESSAGE,
  POST_ADD_CHAT,
  RECEIVE_MESSAGE_REQUEST,
  PUT_UPDATE_CHAT
} from "./actionTypes";
import {
  getChatsSuccess,
  getChatsFail,
  getGroupsSuccess,
  getGroupsFail,
  getContactsSuccess,
  getContactsFail,
  getMessagesSuccess,
  getMessagesFail,
  addMessageSuccess,
  addMessageFail,
  addChatSuccess,
  addChatFail,
  updateChatSuccess,
  updateChatFail
} from "./actions";

//Include Both Helper File with needed methods]
/*
import {
  addChat,
  getChats,
  getGroups,
  getContacts,
  getMessages,
  addMessage,
  receiveMessage,
} from "../../helpers/fakebackend_helper";
*/

import { getChats, addChat, updateChat, addMessage, getMessages } from './api';


// agora você pode usar essas funções aqui


function* onGetChats() {
  try {
    const response = yield call(getChats);
    yield put(getChatsSuccess(response));
  } catch (error) {
    yield put(getChatsFail(error));
  }
}

function* onAddChats({ chat }) {
  try {
    const response = yield call(addChat, chat);
    console.log(response)
    yield put(addChatSuccess(response));
    console.log("deu certo")
  } catch (error) {
    console.log(error)
    yield put(addChatFail(error));
  }
}

function* onGetMessages({ phoneNumber }) {
  try {
    console.log(phoneNumber)
    const response = yield call(getMessages, phoneNumber);
    yield put(getMessagesSuccess(response));
  } catch (error) {
    yield put(getMessagesFail(error));
  }
}

function* onAddMessage({ message }) {
  try {
    const response = yield call(addMessage, message);
    yield put(addMessageSuccess(response));
  } catch (error) {
    console.log(error)
    yield put(addMessageFail(error));
  }
}

function* onUpdateChat({ messageData }) {
  try {
    const response = yield call(updateChat, messageData);
    console.log(response)
    yield put(updateChatSuccess(response));
  } catch (error) {
    console.log(error)
    
    yield put(updateChatFail(error));
  }
 }


function* chatSaga() {
  yield takeEvery(GET_CHATS, onGetChats);
  yield takeEvery(POST_ADD_CHAT, onAddChats)
  yield takeEvery(PUT_UPDATE_CHAT, onUpdateChat)
  yield takeEvery(GET_MESSAGES, onGetMessages);
  yield takeEvery(POST_ADD_MESSAGE, onAddMessage);
}


export default chatSaga;
