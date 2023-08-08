import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Card } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ChatContext } from "./ChatContext";

const ChatWindow = () => {

      const {
    currentPhoneNumber,
    ChatBoxUsername,
    Chat_Box_User_Status,
    currentUser,
    messages,
    currentMessage,
    onKeyPress,
    setCurrentMessage,
    setMessageBox,
    addMessage,
  } = useContext(ChatContext);

  
  return (
    <div className="w-100 user-chat">
      <Card className="border_rounded">
        <div className="p-4 border-bottom ">
          {currentPhoneNumber && (
            <Row>
              <Col md="4" xs="9">
                <h5 className="font-size-15 mb-1">{ChatBoxUsername}</h5>
                <p className="text-muted mb-0">
                  <i
                    className={
                      Chat_Box_User_Status === 'Active'
                        ? 'mdi mdi-circle text-success align-middle me-2'
                        : Chat_Box_User_Status === 'intermediate'
                        ? 'mdi mdi-circle text-warning align-middle me-1'
                        : 'mdi mdi-circle align-middle me-1'
                    }
                  />
                  {Chat_Box_User_Status}
                </p>
              </Col>
            </Row>
          )}
        </div>
        <div>
          <div className="chat-conversation p-3">
            <ul className="list-unstyled">
              <PerfectScrollbar
                style={{ height: '55vh' }}
                containerRef={(ref) => setMessageBox(ref)}
              >
                <li>
                  <div className="chat-day-title">
                    <span className="title">Today</span>
                  </div>
                </li>
                {messages &&
                  messages.length > 0 &&
                  messages.map((message) => {
                    if (message.phoneNumber === currentPhoneNumber) {
                      return (
                        <li
                          key={'test_k' + message.id}
                          className={
                            message.sender === currentUser.name ||
                            message.sender === 'ChatBot'
                              ? 'right'
                              : 'left'
                          }
                        >
                          <div className="conversation-list">
                            <div className="ctext-wrap">
                              <div className="conversation-name">
                                {message.sender}
                              </div>
                              <p>{message.body}</p>
                              <p className="chat-time mb-0">
                                {message.time}{' '}
                                <i className="bx bx-check-double align-middle me-1"></i>
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
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
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className="form-control chat-input"
                    placeholder="Enter a message"
                  />
                </div>
              </Col>
              <Col className="col-auto">
                <Button
                  color="primary"
                  disabled={!currentPhoneNumber}
                  onClick={() => addMessage(currentMessage)}
                  className="btn1 border_rounded"
                >
                  <span className="d-none d-sm-inline-block me-2">Send</span>{' '}
                  <i className="mdi mdi-send" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};

ChatWindow.propTypes = {
  currentPhoneNumber: PropTypes.string,
  chatBoxUsername: PropTypes.string,
  Chat_Box_User_Status: PropTypes.string,
  currentUser: PropTypes.object,
  messages: PropTypes.array,
  currentMessage: PropTypes.string,
  onKeyPress: PropTypes.func,
  setCurrentMessage: PropTypes.func,
  socket: PropTypes.object,
  addMessage: PropTypes.func,
};

export default ChatWindow;
