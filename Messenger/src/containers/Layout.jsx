import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import MessageField from '@containers/MessageField';
import Header from '@containers/Header';
import ChatList from '@containers/ChatList';

const Layout = ({ chats, chatId }) => {
    if (chats[chatId] === undefined) {
        return <Redirect to="/chat/1" />
    }

    return (
        <div className="mainWrapper">
            <Header chatId={chatId} />
            <ChatList chatId={chatId}/>
            <MessageField chatId={chatId} />
        </div>
    );
};

Layout.propTypes = {
    chatId: PropTypes.number.isRequired,
    chats: PropTypes.object.isRequired,
};

Layout.defaultProps = {
    chatId: 1,
};

const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
});

export default connect(mapStateToProps)(Layout);