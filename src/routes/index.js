import { h } from 'preact';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from '@containers/Layout';
import Bundle from '@containers/Bundle';
import Loader from '@components/Loader';

const About = (props) => (
    <Bundle
        load={() =>
            import(
                /* webpackChunkName: "About", webpackPreload: true  */ './About'
            )
        }>
        {(Component) => (
            (Component === null ? <Loader /> : <Component {...props} />)
        )}
    </Bundle>
);

const Rhythmic = (props) => (
    <Bundle
        load={() => import(/* webpackChunkName: "Rhythmic" */ './Rhythmic')}>
        {(Component) => (Component === null ? <Loader /> : <Component {...props} />)}
    </Bundle>
);

const ImagesEngine = (props) => (
    <Bundle
        load={() =>
            import(/* webpackChunkName: "ImagesEngine" */ './ImagesEngine')
        }>
        {(Component) => (Component === null ? <Loader /> : <Component {...props} />)}
    </Bundle>
);

export default () => (
    <Layout>
        <Switch>
            <Route path="/images-engine" component={ImagesEngine} />
            <Route path="/rhythmic" component={Rhythmic} />
            <Route path="/" exact component={About} />
            <Redirect path="*" to="/" />
        </Switch>
    </Layout>
);
