import { takeEvery, put, call } from "redux-saga/effects";

// Chat Redux States
import {
  GET_CHATS,
  GET_CONTACTS,
  GET_GROUPS,
  GET_MESSAGES,
  POST_ADD_MESSAGE,
  POST_ADD_CHAT,
  RECEIVE_MESSAGE_REQUEST
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
  addChatFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  addChat,
  getChats,
  getGroups,
  getContacts,
  getMessages,
  addMessage,
  receiveMessage,
} from "../../helpers/fakebackend_helper";

// import { getChats, addChat, updateChat, addMessage, getMessages } from './api';

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
    console.log('procurando chat')
    const response = yield call(addChat, chat );
    yield put(addChatSuccess(response));
    console.log("deu certo")
  } catch (error) {
    yield put(addChatFail(error));
  }
}

function* onGetGroups() {
  try {
    const response = yield call(getGroups);
    yield put(getGroupsSuccess(response));
  } catch (error) {
    yield put(getGroupsFail(error));
  }
}

function* onGetContacts() {
  try {
    const response = yield call(getContacts);
    yield put(getContactsSuccess(response));
  } catch (error) {
    yield put(getContactsFail(error));
  }
}

function* onGetMessages({ roomId }) {
  try {
    const response = yield call(getMessages, roomId);
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
    yield put(addMessageFail(error));
  }
}

function* onReceiveMessage({ message }) { 
 try {
   const response = yield call(receiveMessage, message);
   console.log(response)
    yield put(addMessageSuccess(response));
  } catch (error) {
    yield put(addMessageFail(error));
  }
}

function* chatSaga() {
  yield takeEvery(GET_CHATS, onGetChats);
  yield takeEvery(POST_ADD_CHAT, onAddChats)
  yield takeEvery(GET_GROUPS, onGetGroups);
  yield takeEvery(GET_CONTACTS, onGetContacts);
  yield takeEvery(GET_MESSAGES, onGetMessages);
  yield takeEvery(POST_ADD_MESSAGE, onAddMessage);
  yield takeEvery(RECEIVE_MESSAGE_REQUEST, onReceiveMessage);
}


export default chatSaga;
