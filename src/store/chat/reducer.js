import {
  GET_GROUPS_SUCCESS,
  GET_CHATS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_CHATS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  POST_ADD_MESSAGE_SUCCESS,
  POST_ADD_MESSAGE_FAIL,
  RECEIVE_MESSAGE_SUCCESS,
  RECEIVE_MESSAGE_FAIL,
  POST_ADD_CHAT_SUCCESS,
  POST_ADD_CHAT_FAIL,
  PUT_UPDATE_CHAT_SUCCESS,
  PUT_UPDATE_CHAT_FAIL
} from "./actionTypes"

const INIT_STATE = {
  chats: [],
  groups: [],
  contacts: [],
  messages: [],
  error: [],
  loading: false,
}

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        loading: false,
      }

    case GET_CHATS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        
      }

    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      }

    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,

      }

    case GET_MESSAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    
    case POST_ADD_CHAT_SUCCESS: {
        response = action.payload == false ? [...state.chats] : [...state.chats, action.payload] 
      return {
        ...state,
        chats: response,

      }
    }
    case POST_ADD_CHAT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_ADD_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    
    case PUT_UPDATE_CHAT_SUCCESS: { 
       const updatedChat = action.payload
      console.log("updatedChat " + updatedChat)
      console.log("state.chats " + state.chats)
      const chats = state.chats.map(chat =>
          chat.phoneNumber === updatedChat.phoneNumber ? updatedChat : chat
        );
      return {
       
      
        ...state,
        chats: chats
      }
  }
    case PUT_UPDATE_CHAT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case RECEIVE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [state.messages, action.payload]

      };
    
    case RECEIVE_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return {...state, loading: false}
  }
}

export default Calendar
