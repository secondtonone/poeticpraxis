import { h, Component } from 'preact';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Bundle from '../components/Bundle';

import loadRhythmic from 'bundle-loader?lazy!./Rhythmic';
import loadAbout from 'bundle-loader?lazy!./About';
import loadImagesEngine from 'bundle-loader?lazy!./ImagesEngine';

const About = (props) => (
    <Bundle load={loadAbout}>{(About) => <About {...props} />}</Bundle>
);

const Rhythmic = (props) => (
    <Bundle load={loadRhythmic}>{(Rhythmic) => <Rhythmic {...props} />}</Bundle>
);

const ImagesEngine = (props) => (
    <Bundle load={loadImagesEngine}>
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
