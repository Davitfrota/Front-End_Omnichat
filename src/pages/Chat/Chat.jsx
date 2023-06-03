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
        const {key, value} = e;
        if (key === "Enter") {
            setCurrentMessage(value);
            addMessage(currentPhoneNumber, currentUser.name, value);
        }
    };

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
