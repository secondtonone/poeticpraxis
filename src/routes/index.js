import { h, Component } from 'preact';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Bundle from '../components/Bundle';

const About = (props) => (
    <Bundle load={import(/* webpackChunkName: "About" */ './About')}>
        {(About) => <About {...props} />}
    </Bundle>
);

const Rhythmic = (props) => (
    <Bundle load={import(/* webpackChunkName: "Rhythmic" */ './Rhythmic')}>
        {(Rhythmic) => <Rhythmic {...props} />}
    </Bundle>
);

const ImagesEngine = (props) => (
    <Bundle load={import(/* webpackChunkName: "ImagesEngine" */ './ImagesEngine')}>
        {(ImagesEngine) => <ImagesEngine {...props} />}
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
