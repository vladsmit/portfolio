import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const ChatCreator = ({ title, onChange, onClick, removeChat}) => {
    return (
        <form className="chatBlock__createForm chatBlock__createForm--margin" onSubmit={onClick}>
            <input className="chatBlock__createForm__titleInput chatBlock__createForm__titleInput--margin" type="text" placeholder="Введите имя чата" value={title} onChange={onChange} />
            <input className="chatBtn" type="submit" value="Создать чат" />
            <input className="chatBtn chatBtn--margin" type="button" value="Удалить чат" onClick={removeChat} />
        </form>
    );
};

ChatCreator.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    removeChat: PropTypes.func.isRequired,
};

export default ChatCreator;
