import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '@containers/Layout';
import Profile from '@containers/Profile';
import Error from '@containers/Error';

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