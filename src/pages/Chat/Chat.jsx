import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import ChatContent from "./ChatContent";
import './Chat.css'
import "react-perfect-scrollbar/dist/css/styles.css";
import {   ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Import Breadcrumb

import { ChatProvider } from "./ChatContext";

const Chat = props => {

  //meta title
  document.title = "Conversas | Omnichat";

 
  return (
    <div>
      
      <ToastContainer/>
    <ChatProvider>
      <ChatContent t={props.t}/>
        </ChatProvider>
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
