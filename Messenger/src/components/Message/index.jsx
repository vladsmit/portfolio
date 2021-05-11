import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Message = ({ sender, removeMessage, text }) => {
    return (
        <div className="textField textField--margin" style={{alignSelf: sender === 'Влад' ? 'flex-end' : 'flex-start'}}>
            <p className="textField__nameTitle">{sender}</p>
            <input className="textField__deleteBtn textField__deleteBtn--margin" type="button" value="x" onClick={removeMessage}/>
            <p className="textField__msgText">{text}</p>
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    removeMessage: PropTypes.func.isRequired,
};

export default Message;