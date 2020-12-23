// import React, { Component } from 'react'
// import {Form, Input, Button, Row, Col} from 'antd';
// // import { Icon } from '@ant-design/icons'
// import {io} from "socket.io-client";
// import { connect } from "react-redux";
// // import PropTypes from 'prop-types';

// import { DownloadOutlined } from '@ant-design/icons';
// // moment - npm пакет для отображения текущего времени
// import moment from "moment";
// import { getChats, afterPostMessage } from "../../actions/chat_actions"
// import ChatCard from "./Sections/ChatCard";
// // импортируем Dropzone из пакета react-dropzone. Нужен для перетаскивания картинок и видео в поле
// import Dropzone from 'react-dropzone';
// import Axios from 'axios';
// import PartyRoom from '../PartyRoom/PartyRoom';

// export class ChatPage extends React.Component {
  
//   constructor(props){
//     super(props)
//     this.state = {
//         chatMessage: "",
//     }
//   }

//     componentDidMount() {
//       let server = "http://localhost:5000";
//       this.props.getAllChats()

//         this.socket = io(server);

//         // this.socket.emit("Input Chat Message", 'hola bitch')
//         this.socket.on("Output Chat Message", messageFromBackEnd => {
//             this.props.getMSGfromBack(messageFromBackEnd);
//         })
//     }

//     componentDidUpdate() {
//       // метод scrollIntoView прокручивает текущий контейнер родителя, так, чтобы этот элемент, на котором был вызван scrollIntoView был видим пользователю
//         this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
//     }

//     handleSearchChange = (e) => {
//         this.setState({
//             chatMessage: e.target.value
//         })
//     }

//     renderCards = () =>
//         this.props.chats
//         && this.props.chats.map((chat) => (
//             <ChatCard key={chat._id}  {...chat} />
//         ));
// // метод onDrop - это поле, куда можно перетащить файлы для загрузки
//     onDrop = (files) => {


//         if (!this.props.user) {
//             return alert('Please Log in first');
//         }


//         // стандартная надстройка, куда мы прибавляем файл в  drop
//         let formData = new FormData();

//         const config = {
//             header: { 'content-type': 'multipart/form-data' }
//         }
        
//         formData.append("file", files[0])

//         Axios.post('api/chat/uploadfiles', formData, config)
//             .then(response => {
//                 if (response.data.success) {
//                     let chatMessage = response.data.url;
//                     let userId = this.props.user._id
//                     let userName = this.props.user.name;
//                     let userImage = this.props.user.avatar;
//                     let nowTime = moment();
//                     let type = "VideoOrImage"

//                     this.socket.emit("Input Chat Message", {
//                         chatMessage,
//                         userId,
//                         userName,
//                         userImage,
//                         nowTime,
//                         type,
//                     });
//                 }
//             })
//     }


//     submitChatMessage = (e) => {
//         e.preventDefault();
//         let chatMessage = this.state.chatMessage
//         let userId = this.props.user._id
//         let userName = this.props.user.name;
//         let userImage = this.props.user.avatar;
//         let nowTime = moment();
//         let type = "Text"

//         let partyId = this.props.match.params.id
//         console.log(partyId);
//         this.socket.emit("Input Chat Message", {
//             chatMessage,
//             userId,
//             userName,
//             userImage,
//             nowTime,
//             type,
//             partyId
//         });
//         this.setState(()=>({ chatMessage: "" }))
//     }

//     render() {
//         return (
//             <React.Fragment>
//               <PartyRoom/>
//               <div className="chat">
//                 <div>
//                     <p style={{ fontSize: '2rem', textAlign: 'center' }}> Let's Chatting</p>
//                 </div>

//                 <div style={{minWidth: '700px', maxWidth: '800px', margin: '0 auto' }}>
//                     <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
//                         {this.props.chats && (
//                             this.renderCards()
//                         )}
 
//                         <div
//                             ref={el => {
//                                 this.messagesEnd = el;
//                             }}
//                             style={{ float: "left", clear: "both" }}
//                         />
//                     </div>

//                     <Row >
//                         <Form layout="inline" onSubmit={this.submitChatMessage} style={{ width: "100%"}}>
//                             <Col span={18}>
//                                 <Input 
                                    
//                                     id="message"
//                                     // prefix='💬'
//                                     placeholder="Come on! Let's start talking!"
//                                     type="text"
//                                     value={this.state.chatMessage}
//                                     onChange={this.handleSearchChange}
//                                 />
                                
//                             </Col>
//                             <Button type="primary" style={{ width: '17%' }} onClick={this.submitChatMessage} htmlType="submit">
//                                    Send!
//                                 </Button>
//                             <Col span={2}>
//                                 <Dropzone onDrop={this.onDrop}>
//                                     {({ getRootProps, getInputProps }) => (
//                                         <section>
//                                             <div {...getRootProps()}>
//                                                 <input {...getInputProps()} />
//                                                 <Button type="primary" icon={<DownloadOutlined />} size="20px"/>
//                                             </div>
//                                         </section>
//                                     )}
//                                 </Dropzone>
//                             </Col>

//                             <Col span={4}>
//                                 {/* <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} htmlType="submit">
//                                    Send!
//                                 </Button> */}
//                             </Col>
//                         </Form>
//                     </Row>
//                 </div>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = state => {

//     return ({
//         user: state.auth.user,
//         chats: state.chatReducer.chats,
//     })
// }

// const mapDispatchToProps = dispatch => {
//   return {
//       getAllChats: () => dispatch(getChats()),
//       getMSGfromBack: (messageFromBackEnd) => dispatch(afterPostMessage(messageFromBackEnd))
//   }

// }

// export default connect(mapStateToProps,mapDispatchToProps)(ChatPage);
import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {sendMessageAC, sendRoom}  from "../../actions/chat_actions";
import ChatCard from "./Sections/ChatCard";
import {SEND_MESSAGE} from '../../actions/types'
// import styles from "./Chat.module.css";
// import {Form, Input, Button, Row, Col} from 'antd';
// import { Icon } from '@ant-design/icons'
// import {io} from "socket.io-client";

import { useParams } from "react-router-dom";



function Chat() {
  const [message, setMessage] = useState("");
  const [write, setWrite] = useState("");
  const dispatch = useDispatch();
  const chat = useSelector((store) => store.chat.messages);
  // const username = JSON.parse(localStorage.getItem("name"));
  const username = useSelector((store)=>store.auth.user.name)
  const room = useParams().partyId;
  // console.log(room);
  const messageText = (e) => {
    setMessage(e.target.value);
    // setWrite('Печатает')
  };

  const sendMessage = () => {
    dispatch({
      type: SEND_MESSAGE,
      payload: {message}, 
    });
    socket.emit("NEW_MESSAGE", message, room);
    setMessage("");
  };
  

  const onKeyDown = (e) => {
    if (e.keyCode == 13) sendMessage();
  };

  useEffect(() => {
    socket.on("NEW_MESSAGE:CLIENT", (message) => {
      dispatch(sendMessageAC(message));
    });
    socket.emit("CONNECT_ROOM", room);
  }, []);

  useEffect(() => {
    socket.emit("WRITE_MESSAGE", username, room);
    socket.on("WRITE_MESSAGE:CLIENT", (user) => {
      setWrite(`${user} печатает...`);
      setTimeout(() => {
        setWrite("");
      }, 2000);

      console.log(user);
    });
  }, [message]);
  return (
    <div className="fira">
      <div>{write}</div>
      <div>
        {chat &&
          chat.map((oneMes, i) => (
            <ChatCard oneMes={oneMes} key={oneMes + i} username={username} />
          ))}
      </div>
      <div>
        <input
          name="massage-input"
          value={message}
          onChange={messageText}
          onKeyDown={onKeyDown}
        />
        <button onClick={sendMessage}>
          отправить
        </button>
      </div>
    </div>
  );
}

export default Chat;
