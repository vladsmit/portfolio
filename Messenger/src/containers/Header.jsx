import React, { useCallback } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

const Header = ({ profile, chats, chatId, push }) => {
    const handleNavigate = useCallback(link => {
        push(link);
    }, [push]);

    return (
        <header className="mainHeader">
            <a className="mainHeader__profileLink" onClick={() => handleNavigate('/profile')}>
                <img src="/src/assets/profile.png" alt="profileLogo" width="40"/>{profile.name}
            </a>
            <span className="mainHeader__chatName mainHeader__chatName--margin">{chats[chatId].title}</span>
        </header>
    );
};

Header.propTypes = {
    profile: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired,
    chatId: PropTypes.number.isRequired,
    push: PropTypes.func.isRequired,
};

const mapStateToProps = ({ chatReducer }) => ({
    profile: chatReducer.profile,
    chats: chatReducer.chats,
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);