import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {isEmpty, map} from "lodash";
import io from 'socket.io-client';
import {withTranslation} from "react-i18next";
import ChatContent from "./chatComponent";
import './Chat.css'
import "react-perfect-scrollbar/dist/css/styles.css";

import {
    addMessage as onAddMessage,
    addChat as onAddChat,
    getChats as onGetChats,
    getContacts as onGetContacts,
    getGroups as onGetGroups,
    getMessages as onGetMessages,
    updateChat as onUpdateChat,
    receiveMessageRequest as OnReceiveMessage
} from "/src/store/actions";

//redux
import {useSelector, useDispatch} from "react-redux";


const Chat = props => {

    //meta title
    document.title = "Conversas | Omnichat";

    const dispatch = useDispatch();

    const {chats, groups, contacts, messages} = useSelector(state => ({
        chats: state.chat.chats,
        groups: state.chat.groups,
        contacts: state.chat.contacts,
        messages: state.chat.messages,
    }));

    const [messageBox, setMessageBox] = useState(null)
    const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        name: "Davi Frota",
        isActive: true,
    });
    const [menu1, setMenu1] = useState(false);
    const [searchMenu, setSearchMenu] = useState(false);
    const [settingsMenu, setSettingsMenu] = useState(false);
    const [otherMenu, setOtherMenu] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [chatBoxUsername, setChatBoxUsername] = useState("");
    const [Chat_Box_User_Status, setChat_Box_User_Status] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [receivedMessage, setReceivedMessage] = useState('');

    const socket = io('http://localhost:8000');
    useEffect(() => {
        dispatch(onGetChats());
        dispatch(onGetGroups());
        dispatch(onGetContacts());

    }, [onGetChats, onUpdateChat, onAddChat, onAddMessage, onGetGroups, onGetContacts, onGetMessages,
        currentPhoneNumber]);

    useEffect(() => {
        if (!isEmpty(messages)) scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Substitua pelo seu servidor Socket.IO
        // Evento para receber mensagens do servidor
        socket.on('user_message', (data) => {
            console.log('mensagem recebida do usuário:', data);
            handleMessage(data)
        });

        socket.on('dialogflow_message', (data) => {
            console.log('mensagem dialogflow:', data);
            handleMessage(data)
        });

        return () => {
            socket.disconnect()
        };
    }, []);

    //Toggle Chat Box Menus
    const toggleSearch = () => {
        setSearchMenu(!searchMenu);
    };
  }, []);
  // const toggleNotification = () => {
  //   setnotification_Menu(!notification_Menu)
  // }

  //Toggle Chat Box Menus
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

  const handleMessage = (messageData) => {
    // Cria um array com todos os chats
    let chatsArray = Object.values(chats);
    

    const chatExists = chatsArray.some(chat => {

      return chat.phoneNumber === messageData.phoneNumber;
    });

    if (!chatExists) {
      console.log('quantidade de chats: ' + chatsArray.length);
      // Ajuste esta linha de acordo com a estrutura do seu estado de chat


    const toggleSettings = () => {
        setSettingsMenu(!settingsMenu);
    };

    const toggleOther = () => {
        setOtherMenu(!otherMenu);
    };

    const toggleTab = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

  //Use For Chat Box
  const userChatOpen = (chat) => {
    setChat_Box_Username(chat.name);
    setChat_Box_User_Status(chat.status);
    setCurrentPhoneNumber(chat.phoneNumber);
    if (chat.unreadMessages && chat.unreadMessages.length > 0) {
      dispatch(onUpdateChat({ phoneNumber: chat.phoneNumber, unreadMessages: [] }))

    }

    //Use For Chat Box
    const userChatOpen = (name, status, phoneNumber) => {
        setChatBoxUsername(name);
        setChat_Box_User_Status(status);
        console.log(phoneNumber)
        setCurrentPhoneNumber(phoneNumber);
        dispatch(onUpdateChat({phoneNumber: phoneNumber, unreadMessages: []}))
        dispatch(onGetMessages(phoneNumber));
    };

    const addMessage = (messageData) => {
        if (messageData.phoneNumber === currentPhoneNumber) {
            setCurrentMessage(messageData.body);
        } else {
            AddUnreadMessageToChat(messageData)
        }
        const message = {

            phoneNumber: messageData.phoneNumber,
            sender: messageData.sender,
            message: messageData.body,
            time: messageData.time,
        };
        //setcurMessage("");
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

  };

  return (
    <React.Fragment>
      <div className="container">
        <Container fluid>
         {/*error.length != 0 && <Alert color="danger"><p>{error[error.length -1].message}</p></Alert>*/}
          {/* Render Breadcrumb */}
          <div style={{marginTop:'20px'}}>
            <Breadcrumbs title="Omnichat" breadcrumbItem= {props.t("Chat")} />
          </div>
          <Row >
            <Col lg="12">
              <div className="d-lg-flex" >
                <div className="chat-leftsidebar me-lg-4">
                  <div >
                    <div className="py-4 border-bottom">
                      <div className="d-flex" style={{justifyContent:"center", alignItems:'center'}}>
                      <ProfileMenu />
                        <div className="flex-grow-1" style={{justifyContent:"center", alignItems:'center', }}>
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-circle text-success align-middle me-2" />
                          </p>
                        </div>

                      
                      </div>
                    </div>

                    <div className="chat-leftsidebar-nav">
                      <TabContent activeTab={activeTab} className="py-4">
                        <TabPane tabId="1">
                          <div>
                            <h5 className="font-size-14 mb-3">{props.t("Recent")}</h5>
                            <ul className="list-unstyled chat-list" id="recent-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {loading &&  <div className="loading-messages"> 
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> }
                                {!chats ?
      <div className="error-message">
        <p className="error-message-text">An error occurred while loading chats</p>
      </div>
      : chats[0] == null ?
                                
                                  <p>Não há chats disponíveis</p>	
                                
                                : map(chats, chat => (
                                  <li
                                    key={chat.id + chat.phoneNumber}
                                    className={
                                      currentPhoneNumber === chat.phoneNumber
                                        ? props.t("Active")
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(chat);
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">
                                          <i
                                            className={
                                              chat.status === props.t("Active")
                                                ? "mdi mdi-circle text-success font-size-10"
                                                : chat.status === "intermediate"
                                                  ? "mdi mdi-circle text-warning font-size-10"
                                                  : "mdi mdi-circle font-size-10"
                                            }
                                          />
                                        </div>
                                        {chat.isImg ?
                                          <div className="avatar-xs align-self-center me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {chat.profile}
                                            </span>
                                          </div>
                                          :
                                          <div className="align-self-center me-3">
                                            <img
                                              src={chat.from === 'whatsapp' ? whatts : instagram}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>
                                        }

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {chat.name}
                                          </h5>
                                          {chat.lastMessage &&
                                            <p className="text-truncate mb-0">
                                              {chat.lastMessage.sender}: {chat.lastMessage.body}
                                            </p>
                                          }
                                        </div>
                                        <div className="flex overflow-hidden">
                                          {chat.lastMessage &&
                                            <div className="font-size-11">
                                            
                                              {chat.lastMessage.time}
                                            </div>
                                          }
                                          
                                          {chat.unreadMessages && chat.unreadMessages.length > 0 &&
                                              <div className="unread-message-count">
                                                  {chat.unreadMessages.length}
                                                </div>
                                              }
                                          </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>

                      
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  
                  <Card>
                    
                    <div className="p-4 border-bottom ">
                      {currentPhoneNumber &&
                        <Row>
                          <Col md="4" xs="9">
                            <h5 className="font-size-15 mb-1">
                              {Chat_Box_Username}
                            </h5>

    //search recent user
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
        <ChatContent activeTab={activeTab} chats={chats} chatBoxUsername={chatBoxUsername}
                     currentPhoneNumber={currentPhoneNumber}
                     Chat_Box_User_Status={Chat_Box_User_Status} messages={messages} currentMessage={currentMessage}
                     onKeyPress={onKeyPress} setMessageBox={setMessageBox} userChatOpen={userChatOpen}
                     {...props} />
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
    onAddChat: PropTypes.func,
};

export default withTranslation()(Chat);
