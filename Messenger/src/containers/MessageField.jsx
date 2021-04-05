import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Message from '@components/Message';
import MessageSender from '@components/MessageSender';
import { addMessage, removeMessage } from '@actions/messageActions';

const MessageField = (props) => {
    const [value, setValue] = useState(() => {
        return '';
    });

    useEffect(() => {
        handleScrollToBottom();
    });

    const cardEndRef = useRef(null);

    const handleScrollToBottom = useCallback(() => {
        cardEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleClick = useCallback(e => {
        e.preventDefault();
        handleSendMessage(value, 'Влад');
    }, [props.messages, props.chats, value]);

    const handleSendMessage = useCallback((message, sender) => {
        props.addMessage(message, sender, props.chatId, false);
        if (sender === 'Влад') {
            setValue(() => {
                return '';
            });
        };
    }, [props.messages, props.chats, value]);

    const handleChangeValue = useCallback(e => {
        setValue(() => {
            return e.target.value;
        });
    }, [value]);

    const handleRemoveMessage = useCallback((messageId) => {
        props.removeMessage(props.chatId, messageId);
    }, [props.chats, props.chatId]);



    let messageElement = props.chats[props.chatId].messageList.map((messageId, i) => <Message key={i} text={props.messages[messageId].text} sender={props.messages[messageId].sender} removeMessage={() => handleRemoveMessage(messageId)} />);

    return (
        <main className="msgField--wrapper">
            <div className="msgField">
                {messageElement}
                <div className="msgField--bottom" ref={cardEndRef}></div>
            </div>
            <MessageSender onClick={handleClick} input={value} onChange={handleChangeValue} />
        </main>
    );
};

MessageField.propTypes = {
    messages: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired,
    chatId: PropTypes.number.isRequired,
    addMessage: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ chatReducer }) => ({
    messages: chatReducer.messages,
    chats: chatReducer.chats,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addMessage, removeMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);