import {
  GET_CHATS,
  GET_CHATS_FAIL,
  GET_CHATS_SUCCESS,
  GET_GROUPS,
  GET_GROUPS_FAIL,
  GET_GROUPS_SUCCESS,
  GET_CONTACTS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_MESSAGES,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  POST_ADD_MESSAGE,
  POST_ADD_MESSAGE_FAIL,
  POST_ADD_MESSAGE_SUCCESS,
  RECEIVE_MESSAGE_REQUEST,
  RECEIVE_MESSAGE_SUCCESS,
  RECEIVE_MESSAGE_FAIL,
  POST_ADD_CHAT,
  POST_ADD_CHAT_SUCCESS,
  POST_ADD_CHAT_FAIL,
  PUT_UPDATE_CHAT,
  PUT_UPDATE_CHAT_SUCCESS,
  PUT_UPDATE_CHAT_FAIL
} from "./actionTypes"

export const getChats = () => ({
  type: GET_CHATS,
})

export const updateChat = (chatData) => ({
  type: PUT_UPDATE_CHAT, 
  chatData,
  
})

export const updateChatSuccess = chat => ({
  type: PUT_UPDATE_CHAT_SUCCESS,
  payload: chat,
})

export const updateChatFail = error => ({
  type: PUT_UPDATE_CHAT_FAIL, 
  payload: error,
})

export const getChatsSuccess = chats => ({
  type: GET_CHATS_SUCCESS,
  payload: chats,
})

export const getChatsFail = error => ({
  type: GET_CHATS_FAIL,
  payload: error,
})

export const getGroups = () => ({
  type: GET_GROUPS,
})

export const getGroupsSuccess = groups => ({
  type: GET_GROUPS_SUCCESS,
  payload: groups,
});

export const getGroupsFail = error => ({
  type: GET_GROUPS_FAIL,
  payload: error,
})

export const getContacts = () => ({
  type: GET_CONTACTS,
})

export const getContactsSuccess = contacts => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contacts,
})

export const getContactsFail = error => ({
  type: GET_CONTACTS_FAIL,
  payload: error,
})

export const getMessages = phoneNumber => ({
  type: GET_MESSAGES,
  phoneNumber,
})

export const getMessagesSuccess = messages => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
})

export const getMessagesFail = error => ({
  type: GET_MESSAGES_FAIL,
  payload: error,
})

export const addMessage = message => ({
  type: POST_ADD_MESSAGE,
  message,
})

export const addMessageSuccess = message => ({
  type: POST_ADD_MESSAGE_SUCCESS,
  payload: message,
})

export const addMessageFail = error => ({
  type: POST_ADD_MESSAGE_FAIL,
  payload: error,
})

export const addChat = chat => ({
  type: POST_ADD_CHAT,
  chat,
})


export const addChatSuccess = chat => ({
  type: POST_ADD_CHAT_SUCCESS,
  payload: chat
})

export const addChatFail = error => ({
  type: POST_ADD_CHAT_FAIL,
  payload: error
})

export const receiveMessageRequest = message => ({
  type: RECEIVE_MESSAGE_REQUEST,
  message
});

export const receiveMessageSuccess = response => ({
  type: RECEIVE_MESSAGE_SUCCESS,
  payload: response
});

export const receiveMessageFail = error => ({
  type: RECEIVE_MESSAGE_FAIL,
  payload: error
});
