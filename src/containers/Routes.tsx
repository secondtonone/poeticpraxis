import { h, FunctionalComponent } from 'preact';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import ComponentDefault from '@typings/ComponentDefault';

import Layout from '@containers/Layout';
import Bundle from '@containers/Bundle';
import Loader from '@components/Loader';

const makeModule = (importModule: () => Promise<ComponentDefault<RouteComponentProps>>) =>
    (props: RouteComponentProps) =>
        (
            <Bundle load={importModule}>
                {(RoutComponent) =>
                    RoutComponent === null ? (
                        <Loader />
                    ) : (
                        <RoutComponent {...props} />
                    )
                }
            </Bundle>
        );

const About = makeModule(
    () => import(/* webpackChunkName: "About", webpackPreload: true  */ '../routes/About')
);

const Rhythmic = makeModule(
    () => import(/* webpackChunkName: "Rhythmic" */ '../routes/Rhythmic')
);

const ImagesEngine = makeModule(
    () => import(/* webpackChunkName: "ImagesEngine" */ '../routes/ImagesEngine')
);

const Routes: FunctionalComponent = () => (
    <Layout>
        <Switch>
            <Route path="/images-engine" component={ImagesEngine} />
            <Route path="/rhythmic" component={Rhythmic} />
            <Route path="/" exact component={About} />
            <Redirect path="*" to="/" />
        </Switch>
    </Layout>
);

export default Routes;
