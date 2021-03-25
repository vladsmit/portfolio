import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '@pages/Layout';
import Profile from '@pages/Profile';
import Error from '@pages/Error';

const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/chat/1" />} />
            <Route exact path="/chat/:chatId/" render={obj => <Layout chatId={Number(obj.match.params.chatId)} />} />
            <Route exact path="/profile/" render={() => <Profile />} />
            <Route path="*" render={() => <Error />} />
        </Switch>
    );
};

export default Router;