import React, { useCallback } from 'react';
import { goBack } from 'connected-react-router';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

const Profile = ({ goBack, profile }) => {
    const handleNavigate = useCallback(() => {
        goBack();
    }, [goBack]);

    return (
        <div className="profile--wrapper">
            <img src="/src/assets/avatar.png" alt="Avatar" width="185" />
            <div className="profile__infoBlock profile__infoBlock--margin">
                <p className="profile__info--margin">Имя: {profile.name}</p>
                <p className="profile__info--margin">Город: {profile.city}</p>
                <p className="profile__info--margin">Возраст: {profile.age}</p>
                <p className="profile__info--margin">Информация о себе: {profile.info}</p>
                <a onClick={() => handleNavigate()}>
                    <input className="mainBtn mainBtn--margin" type="submit" value="Вернуться в чат" />
                </a>
            </div>
        </div>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
};

const mapStateToProps = ({ chatReducer }) => ({
    profile: chatReducer.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators({ goBack }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);