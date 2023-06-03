import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {isEmpty, map} from "lodash";
import io from 'socket.io-client';
import {withTranslation} from "react-i18next";
import moment from "moment";
import {
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    UncontrolledDropdown,
    UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import './Chat.css'
//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import ProfileMenu from "/src/components/CommonForBoth/TopbarDropdown/ProfileMenu";

import images from "/src/assets/images";
import instagramIcon from "../../assets/images/chat/instagramIcon.png";
import whatsappIcon from "../../assets/images/chat/whatsappIcon.png";

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
import {updateChat} from "../../store/chat/api";
import {current} from "@reduxjs/toolkit";


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
    // const Chat_Box_Username2 = "Henry Wells"
    const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);
    // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
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
    // const toggleNotification = () => {
    //   setnotification_Menu(!notification_Menu)
    // }

    //Toggle Chat Box Menus
    const toggleSearch = () => {
        setSearchMenu(!searchMenu);
    };

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

    const handleMessage = (messageData) => {
        const chatsArray = Object.values(chats);
        const chatExists = chatsArray.some(chat => chat.phoneNumber === messageData.phoneNumber);

        if (!chatExists) {
            console.log('quantidade de chats: ' + chatsArray)
            // Ajuste esta linha conforme a estrutura do seu estado de chat

            const newChat = {
                id: chats.length,
                phoneNumber: messageData.phoneNumber,
                from: messageData.from,
                lastMessage: messageData,
                unreadMessages: [messageData],
                name: messageData.sender,
                status: "active"
            };
            dispatch(onAddChat(newChat));
        }
        addMessage(messageData)
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
        }
        console.log(err);
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
        const {key, value} = e;
        if (key === "Enter") {
            setCurrentMessage(value);
            addMessage(currentPhoneNumber, currentUser.name, value);
        }
    };

    //serach recent user
    const searchUsers = () => {
        var input, filter, ul, li, a, i, txtValue;
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
        <React.Fragment>
            <div className="container">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <div style={{marginTop: '20px'}}>
                        <Breadcrumbs title="Omnichat" breadcrumbItem={props.t("Chat")}/>
                    </div>
                    <Row>
                        <Col lg="12">
                            <div className="d-lg-flex">
                                <div className="chat-leftsidebar me-lg-4">
                                    <div>
                                        <div className="py-4 border-bottom">
                                            <div className="d-flex"
                                                 style={{justifyContent: "center", alignItems: 'center'}}>
                                                <ProfileMenu/>
                                                <div className="flex-grow-1"
                                                     style={{justifyContent: "center", alignItems: 'center',}}>
                                                    <p className="text-muted mb-0">
                                                        <i className="mdi mdi-circle text-success align-middle me-2"/>
                                                    </p>
                                                </div>

                                                {/* <div>
                          <Dropdown
                            isOpen={menu1}
                            toggle={() => setMenu1(!menu1)}
                            className="chat-noti-dropdown active"
                          >
                            <DropdownToggle
                              tag="a"
                              className="btn"
                            >
                              <i className="bx bx-bell bx-tada"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem href="#">Action</DropdownItem>
                              <DropdownItem href="#">Another action</DropdownItem>
                              <DropdownItem href="#">Something else</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div> */}
                                            </div>
                                        </div>

                                        <div className="chat-leftsidebar-nav">
                                            <TabContent activeTab={activeTab} className="py-4">
                                                <TabPane tabId="1">
                                                    <div>
                                                        <h5 className="font-size-14 mb-3">{props.t("Recent")}</h5>
                                                        <ul className="list-unstyled chat-list" id="recent-list">
                                                            <PerfectScrollbar style={{height: "410px"}}>
                                                                {map(chats, chat => (
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
                                                                                userChatOpen(
                                                                                    chat.name,
                                                                                    chat.status,
                                                                                    chat.phoneNumber
                                                                                );
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
                                                                                    <div
                                                                                        className="avatar-xs align-self-center me-3">
                                            <span
                                                className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {chat.profile}
                                            </span>
                                                                                    </div>
                                                                                    :
                                                                                    <div
                                                                                        className="align-self-center me-3">
                                                                                        <img
                                                                                            src={chat.from === 'whatsapp' ? whatsappIcon : instagramIcon}
                                                                                            className="rounded-circle avatar-xs"
                                                                                            alt=""
                                                                                        />
                                                                                    </div>
                                                                                }

                                                                                <div
                                                                                    className="flex-grow-1 overflow-hidden">
                                                                                    <h5 className="text-truncate font-size-14 mb-1">
                                                                                        {chat.name}
                                                                                    </h5>

                                                                                    <p className="text-truncate mb-0">
                                                                                        {chat.lastMessage.body}
                                                                                    </p>

                                                                                </div>
                                                                                <div className="flex overflow-hidden">
                                                                                    <div className="font-size-11">
                                                                                        {chat.lastMessage.time}
                                                                                    </div>
                                                                                    {chat.unreadMessages && chat.unreadMessages.length > 0 &&
                                                                                        <div
                                                                                            className="unread-message-count">
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
                                            <Row>
                                                <Col md="4" xs="9">
                                                    <h5 className="font-size-15 mb-1">
                                                        {chatBoxUsername}
                                                    </h5>

                                                    <p className="text-muted mb-0">
                                                        <i
                                                            className={
                                                                Chat_Box_User_Status === props.t("Active")
                                                                    ? "mdi mdi-circle text-success align-middle me-2"
                                                                    : Chat_Box_User_Status === "intermediate"
                                                                        ? "mdi mdi-circle text-warning align-middle me-1"
                                                                        : "mdi mdi-circle align-middle me-1"
                                                            }
                                                        />
                                                        {Chat_Box_User_Status}
                                                    </p>
                                                </Col>
                                                <Col md="8" xs="3">
                                                    {/* <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-search-alt-2" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-md"
                                >
                                  <Form className="p-3">
                                    <FormGroup className="m-0">
                                      <InputGroup>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search ..."
                                          aria-label="Recipient's username"
                                        />
                                         <InputGroupAddon addonType="append"> aqui
                                        <Button color="primary" type="submit">
                                          <i className="mdi mdi-magnify" />
                                        </Button>
                                         </InputGroupAddon> aqui
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item  d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={settings_Menu}
                                toggle={toggleSettings}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-cog" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem href="#">
                                    View Profile
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Clear chat
                                  </DropdownItem>
                                  <DropdownItem href="#">Muted</DropdownItem>
                                  <DropdownItem href="#">Delete</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item">
                              <Dropdown
                                isOpen={other_Menu}
                                toggle={toggleOther}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-dots-horizontal-rounded" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem href="#">Action</DropdownItem>
                                  <DropdownItem href="#">
                                    Another Action
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Something else
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul> */}
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <div className="chat-conversation p-3">
                                                <ul className="list-unstyled">
                                                    <PerfectScrollbar
                                                        style={{height: "470px"}}
                                                        containerRef={ref => setMessageBox(ref)}
                                                    >

                                                        <li>
                                                            <div className="chat-day-title">
                                                                <span className="title">{props.t("Today")}</span>
                                                            </div>
                                                        </li>
                                                        {messages && messages.length > 0 && messages[0].phoneNumber == currentPhoneNumber &&
                                                            map(messages, message => (
                                                                <li
                                                                    key={"test_k" + message.id}
                                                                    className={
                                                                        message.sender === currentUser.name || message.sender === 'ChatBot'
                                                                            ? "right"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <div className="conversation-list">
                                                                        {/*<UncontrolledDropdown> Copy, Select, Delete a menssage in chat
                                      <DropdownToggle
                                        href="#"
                                        tag="a" className="dropdown-toggle"
                                      >
                                        <i className="bx bx-dots-vertical-rounded" />
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={(e) => copyMsg(e.target)} href="#">
                                          Copy
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Save
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Forward
                                        </DropdownItem>
                                        <DropdownItem onClick={(e) => toggle_deleMsg(e.target)} href="#">
                                          Delete
                                        </DropdownItem>

                                      </DropdownMenu>
                                    </UncontrolledDropdown> */}
                                                                        <div className="ctext-wrap">
                                                                            <div className="conversation-name">
                                                                                {message.sender}
                                                                            </div>
                                                                            <p>{message.message}</p>
                                                                            <p className="chat-time mb-0"><i
                                                                                className="bx bx-time-five align-middle me-1"></i> {message.time}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                    </PerfectScrollbar>
                                                </ul>
                                            </div>
                                            <div className="p-3 chat-input-section">
                                                <Row>
                                                    <Col>
                                                        <div className="position-relative">
                                                            <input
                                                                type="text"
                                                                value={currentMessage}
                                                                onKeyPress={onKeyPress}
                                                                onChange={e => {
                                                                    setCurrentMessage(e.target.value)
                                                                    console.log('enviando mensagem')
                                                                    socket.emit('sendMessage', e.target.value)
                                                                }}
                                                                className="form-control chat-input"
                                                                placeholder={props.t("EnterMessage")}
                                                            />
                                                            {/* <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">x
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-emoticon-happy-outline"
                                        id="Emojitooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Emojitooltip"
                                      >
                                        Emojis
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-image-outline"
                                        id="Imagetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Imagetooltip"
                                      >
                                        Images
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-document-outline"
                                        id="Filetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Filetooltip"
                                      >
                                        Add Files
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                </ul>
                              </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col className="col-auto">
                                                        <Button
                                                            type="button"
                                                            color="primary"
                                                            onClick={() =>
                                                                addMessage(currentPhoneNumber, currentUser.name)
                                                            }
                                                            className="btn btn-primary btn-rounded chat-send w-md "
                                                        >
                              <span className="d-none d-sm-inline-block me-2">
                                Send
                              </span>{" "}
                                                            <i className="mdi mdi-send"/>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
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
