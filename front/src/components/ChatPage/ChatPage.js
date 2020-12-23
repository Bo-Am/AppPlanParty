import React, { Component } from 'react'
import {Form, Input, Button, Row, Col} from 'antd';
// import { Icon } from '@ant-design/icons'
import {io} from "socket.io-client";
import { connect } from "react-redux";
// import PropTypes from 'prop-types';

// moment - npm пакет для отображения текущего времени
import moment from "moment";
import { getChats, afterPostMessage } from "../../actions/chat_actions"
import ChatCard from "./Sections/ChatCard";
// импортируем Dropzone из пакета react-dropzone. Нужен для перетаскивания картинок и видео в поле
import Dropzone from 'react-dropzone';
import Axios from 'axios';

export class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

    componentDidMount() {
      let server = "http://localhost:5000";

        this.props.dispatch(getChats());

        this.socket = io(server);

        // this.socket.emit("Input Chat Message", 'hola bitch')
        this.socket.on("Output Chat Message", messageFromBackEnd => {
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
    }

    componentDidUpdate() {
      // метод scrollIntoView прокручивает текущий контейнер родителя, так, чтобы этот элемент, на котором был вызван scrollIntoView был видим пользователю
   
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    handleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () =>
        this.props.chats
        && this.props.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} />
        ));
// метод onDrop - это поле, куда можно перетащить файлы для загрузки
    onDrop = (files) => {
        console.log(files)


        if (!this.props.user) {
            return alert('Please Log in first');
        }


        // стандартная надстройка, куда мы прибавляем файл в  drop
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        
        formData.append("file", files[0])

        Axios.post('api/chat/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    let chatMessage = response.data.url;
                    let userId = this.props.user._id
                    let userName = this.props.user.name;
                    let userImage = this.props.user.avatar;
                    let nowTime = moment();
                    let type = "VideoOrImage"

                    this.socket.emit("Input Chat Message", {
                        chatMessage,
                        userId,
                        userName,
                        userImage,
                        nowTime,
                        type
                    });
                }
            })
    }


    submitChatMessage = (e) => {
        e.preventDefault();
        let chatMessage = this.state.chatMessage
        let userId = this.props.user._id
        let userName = this.props.user.name;
        let userImage = this.props.user.avatar;
        let nowTime = moment();
        let type = "Text"

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        this.setState(()=>({ chatMessage: "" }))
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}> Let's Chatting</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                        {this.props.chats && (
                            this.renderCards()
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input 
                                    id="message"
                                    prefix='💬'
                                    placeholder="Come on! Let's start talking!"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.handleSearchChange}
                                />
                            </Col>
                            <Col span={2}>
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    '📤'
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>

                            <Col span={4}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} htmlType="submit">
                                   Send!
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        chats: state.chatReducer.chats,
    }
}


export default connect(mapStateToProps)(ChatPage);
