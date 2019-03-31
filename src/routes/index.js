import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Bundle from '../components/Bundle';

const About = (props) => (
    <Bundle load={() => import(/* webpackChunkName: "About" */ './About')}>
        {(Component) => (Component === null ? null : <Component {...props} />)}
    </Bundle>
);

const Rhythmic = (props) => (
    <Bundle
        load={() => import(/* webpackChunkName: "Rhythmic" */ './Rhythmic')}>
        {(Component) => (Component === null ? null : <Component {...props} />)}
    </Bundle>
);

const ImagesEngine = (props) => (
    <Bundle
        load={() =>
            import(/* webpackChunkName: "ImagesEngine" */ './ImagesEngine')
        }>
        {(Component) => (Component === null ? null : <Component {...props} />)}
    </Bundle>
);

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/about" />} />
            <Route path="/images-engine" component={ImagesEngine} />
            <Route path="/rhythmic" component={Rhythmic} />
            <Route path="/about" component={About} />
            <Redirect path="*" to="/" />
        </Switch>
    </Layout>
);
