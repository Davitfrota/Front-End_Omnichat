import {Button, Card, Col, Container, Row, TabContent, TabPane} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import PerfectScrollbar from "react-perfect-scrollbar";
import {map} from "lodash";
import React from "react";
import ChatItemList from './ChatItemList';
import whatsappIcon from "../../assets/images/chat/whatsappIcon.png";
import instagramIcon from "../../assets/images/chat/instagramIcon.png";
import facebookIcon from "../../assets/images/chat/MenssagerIcon.png";

const ChatContent = ({ activeTab, chats, chatBoxUsername, Chat_Box_User_Status, currentPhoneNumber, messages, currentMessage,
  onKeyPress, setMessageBox, currentUser, userChatOpen, loading, ...props }) => {
  const social_icons = {
    whatsapp: whatsappIcon,
    instagram: instagramIcon,
    messenger: facebookIcon,
  }
    return (<React.Fragment>
        <div className="page-content">
            <Container fluid>
                {/* Render Breadcrumb */}
                <div>
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
                              {loading ? (
                                <Spinner color="primary" className="loader" />) : (
                                <PerfectScrollbar style={{ height: "410px" }}>
                                                            
                                  {!chats ?
                                    <div className="error-message">
                                      <p className="error-message-text">An error occurred while loading chats</p>
                                    </div>
                                    : chats.length === 0 ?
                                                                                
                                      <p>{props.t("NoChats")}</p>
                                                                                
                                      : map(chats, chat => (
                                        <li
                                          key={chat.id + chat.phoneNumber}
                                          className={`li-max-width ${currentPhoneNumber === chat.phoneNumber ? props.t("Active") : ""}`}
                                        >
                                          <ChatItemList chat={chat} userChatOpen={userChatOpen} t={props.t} from={social_icons[chat.from]} />
                                        </li>
                                      ))}
                                </PerfectScrollbar>)
                              }                                                    </ul>
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
                                        }
                                    </div>
                                    <div>
                                        <div className="chat-conversation p-3">
                                            <ul className="list-unstyled">
                                                <PerfectScrollbar
                                                    style={{height: "55vh"}}
                                                    containerRef={ref => setMessageBox(ref)}
                                                >

                                                    <li>
                                                        <div className="chat-day-title">
                                                            <span className="title">{props.t("Today")}</span>
                                                        </div>
                                                    </li>
                        {messages && messages.length > 0 && messages.map(message => {
  if (message.phoneNumber === currentPhoneNumber) {
    return (
      <li
        key={"test_k" + message.id}
        className={
          message.sender === currentUser.name || message.sender === 'ChatBot'
            ? "right"
            : "left"
        }
      >
        <div className="conversation-list">
          <div className="ctext-wrap">
            <div className="conversation-name">
              {message.sender}
            </div>
            <p>{message.body}</p>
            <p className="chat-time mb-0">
              {message.time} <i className="bx bx-check-double align-middle me-1"></i>
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
                              disabled={!currentPhoneNumber}
                                                        onClick={() =>
                                                            addMessage(currentPhoneNumber, currentUser.name)
                                                        }
                                                        className="btn1"
                                                    >
                                                    <span className="d-none d-sm-inline-block me-2">
                                                      {props.t("Send")}
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
    </React.Fragment>)
}

export default ChatContent;