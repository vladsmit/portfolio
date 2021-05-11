import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const MessageSender = ({ onClick, input, onChange }) => {
    const inputFocus = useRef(null);

    useEffect(() => {
        inputFocus.current.focus();
    }, []);

    return (
        <form className="msgSender__form" onSubmit={onClick}>
            <input className="msgSender__input msgSender__input--margin" type="text" value={input} ref={inputFocus} onChange={onChange} />
            <input className="sendBtn" type="submit" />
        </form>
    );
};

MessageSender.propTypes = {
    input: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default MessageSender;