import React, {useContext}from 'react';
import { TabContent, TabPane } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { map } from 'lodash';
import ChatItemList from './ChatItemList';
import { ChatContext } from "./ChatContext";
const ChatList = (props) => {
  const { activeTab, chats, currentPhoneNumber, userChatOpen, social_icons} = useContext(ChatContext);;

  return (
    <div className="chat-leftsidebar-nav">
      <TabContent activeTab={activeTab} className="py-4">
        <TabPane tabId="1">
          <div>
            <h5 className="font-size-14 mb-3">{props.t("Recent")}</h5>
            <ul className="list-unstyled chat-list" id="recent-list">
            
                <PerfectScrollbar style={{ height: "410px" }}>
                  {!chats ? (
                    <div className="error-message">
                      <p className="error-message-text">An error occurred while loading chats</p>
                    </div>
                  ) : chats.length === 0 ? (
                    <p>{props.t("NoChats")}</p>
                  ) : (
                    map(chats, (chat) => (
                      <li
                        key={chat.id + chat.phoneNumber}
                        className={`li-max-width ${
                          currentPhoneNumber === chat.phoneNumber ? props.t("Active") : ""
                        }`}
                      >
                        <ChatItemList chat={chat} userChatOpen={userChatOpen} t={props.t} from={social_icons[chat.from]} />
                      </li>
                    ))
                  )}
                </PerfectScrollbar>
            </ul>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ChatList;
