import React, { useState, useCallback } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import { addChat, removeChat } from '@actions/chatActions';
import ChatCreator from '@components/ChatCreator';

const ChatList = ({ chats, chatId, addChat, removeChat, push }) => {
    const [title, setTitle] = useState(() => {
        return '';
    });

    const chatElements = Object.entries(chats).map(([key, value], i) => (<li key={i} className={chats[key].blink ? "chatBlock__list__item chatBlock__list__item--animation" : "chatBlock__list__item"} onClick={() => handleNavigate(`/chat/${key}`)}>{value.title}</li>));

    const handleChatTitle = useCallback(e => {
        setTitle(() => {
            return e.target.value;
        });
    }, [title]);

    const handleClick = useCallback(e => {
        e.preventDefault();
        handleAddChat(title);
        setTitle(() => {
            return '';
        });
    }, [title, chats, handleAddChat]);

    const handleAddChat = useCallback((title) => {
        addChat(title);
    }, [chats, title, addChat]);

    const handleRemoveChat = useCallback(() => {
        removeChat(chatId);
    }, [chats, chatId, removeChat]);

    const handleNavigate = useCallback(link => {
        push(link);
    }, [push]);

    return (
        <section className="chatBlock">
            <nav className="chatBlock__list">
                {chatElements}
            </nav>
            <ChatCreator title={title} onChange={handleChatTitle} onClick={handleClick} removeChat={handleRemoveChat} />
        </section>
    );
};

ChatList.propTypes = {
    chatId: PropTypes.number.isRequired,
    chats: PropTypes.object.isRequired,
    addChat: PropTypes.func.isRequired,
    removeChat: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
};

const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, removeChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);