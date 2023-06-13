import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import io from 'socket.io-client';
import { withTranslation } from "react-i18next";
import ChatContent from "./ChatContent";
import './Chat.css'
import "react-perfect-scrollbar/dist/css/styles.css";
import { toast,  ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Alert
} from "reactstrap";
//Import Breadcrumb

import {
  addMessage as onAddMessage,
  addChat as onAddChat,
  getChats as onGetChats,
  getMessages as onGetMessages,
  updateChat as onUpdateChat,
} from "/src/store/actions";

import { useSelector, useDispatch } from "react-redux";

const Chat = props => {

  //meta title
  document.title = "Conversas | Omnichat";

  const dispatch = useDispatch();


  const [messageBox, setMessageBox] = useState(null)
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Davi Frota",
    isActive: true,
  });
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [other_Menu, setother_Menu] = useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [ChatBoxUsername, setChat_Box_Username] = useState("");
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState(false);
  const [currentMessage, setcurrentMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);

  
  const socket = io('https://twilliopizza.mateusb121.repl.co');
  useEffect(() => {
    dispatch(onGetChats());
    
  }, [onGetChats, onAddChat, onAddMessage, onGetMessages,
    currentPhoneNumber]);

  
  const {chats: unorderedChats, groups, contacts, messages, loading, error } = useSelector(state => ({
    chats: state.chat.chats,
    groups: state.chat.groups,
    contacts: state.chat.contacts,
    messages: state.chat.messages,
    loading: state.chat.loading,
    error: state.chat.error
  }));

  const chats = React.useMemo(() => {
  return [...unorderedChats].sort((a, b) => new Date(b.messagePot[b.messagePot.length-1].time) - new Date(a.messagePot[a.messagePot.length-1].time));
}, [unorderedChats]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('user_message', (data) => {
      handleMessage(data)
    });

    socket.on('dialogflow_message', (data) => {
      handleMessage(data)
    });
    
    return () => {
      socket.disconnect()
    };
  }, []);

  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const toggleOther = () => {
    setother_Menu(!other_Menu);
  };

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const displayErrorToast = (message) => {
    if (!isToastActive) {
      setIsToastActive(true);
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => setIsToastActive(false) // Atualiza o estado quando o toast é fechado
      });
    }
  };

  if (error && error.message) {
    displayErrorToast(error.message);
  }

  const handleMessage = (messageData) => {
    // Cria um array com todos os chats
   
    if (messageData.phoneNumber) {
      let chatsArray = Object.values(chats);
      console.log('messageData:', messageData);
      const chatExists = chatsArray.some(chat => {
        console.log('chat.phoneNumber:', chat.phoneNumber);
        console.log('messageData.phoneNumber:', messageData.phoneNumber);
        return chat.phoneNumber === messageData.phoneNumber;
      });
    
      if (!chatExists) {
        console.log('quantidade de chats: ' + chatsArray.length);
        // Ajuste esta linha conforme a estrutura do seu estado de chat

        const newChat = { id: chats.length, phoneNumber: messageData.phoneNumber, from: messageData.from, messagePot: [messageData], unreadMessages: 1, name: messageData.sender, status: "active" };
      
        dispatch(onAddChat(newChat));
      }

      addMessage(messageData);
      console.log('mensagem adicionada: ' + messageData.body);
    }
  }

  const userChatOpen = (chat) => {
    setChat_Box_Username(chat.name);
    setChat_Box_User_Status(chat.status);
    console.log(chat.phoneNumber)
    setCurrentPhoneNumber(chat.phoneNumber);
    if (chat.unreadMessages && chat.unreadMessages > 0) {
      dispatch(onUpdateChat({ phoneNumber: chat.phoneNumber, unreadMessages: 0 }))
    }
    dispatch(onGetMessages(chat.phoneNumber));
  };

  const addMessage = (messageData) => {
    if (messageData.phoneNumber === currentPhoneNumber) {
      setcurrentMessage(messageData.body);
     }
    else {
      AddUnreadMessageToChat(messageData)
     }
    const message = {
      
      phoneNumber: messageData.phoneNumber,
      sender: messageData.sender,
      body: messageData.body,
      time: messageData.time,
    };
    try {
      dispatch(onAddMessage(message));
      return message;
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };

  const AddUnreadMessageToChat = (messageData) => { 
      dispatch(onUpdateChat(messageData))
  }
  const onKeyPress = e => {
    const { key, value } = e;
    if (key === "Enter") {
      setcurrentMessage(value);
      addMessage(currentPhoneNumber, currentUser.name, value);
    }
  };

  const searchUsers = () => {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recent-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };


  return (
    <div>
      <ToastContainer/>
      <ChatContent activeTab={activeTab} chats={chats} chatBoxUsername={ChatBoxUsername}
        currentPhoneNumber={currentPhoneNumber}
        currentUser={currentUser} 
                      Chat_Box_User_Status={Chat_Box_User_Status} messages={messages} currentMessage={currentMessage}
                      onKeyPress={onKeyPress} setMessageBox={setMessageBox} userChatOpen={userChatOpen}
    {...props } />
    </div>
  );
};

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
  onAddChat:PropTypes.func,
};

export default withTranslation()(Chat);
