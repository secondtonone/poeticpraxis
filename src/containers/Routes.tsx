import { h } from 'preact';
import { FC } from 'preact/compat';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Store } from '@store';

import Layout from '@containers/Layout';
import Bundle from '@containers/Bundle';
import Loader from '@components/Loader';

const makeModule = (importModule: () => Promise<any>) => (props: Store) => (
    <Bundle load={importModule}>
        {(Component) =>
            Component === null ? <Loader /> : <Component {...props} />
        }
    </Bundle>
);

const About = makeModule(() =>
    import(/* webpackChunkName: "About", webpackPreload: true  */ '../routes/About')
);

const Rhythmic = makeModule(() =>
    import(/* webpackChunkName: "Rhythmic" */ '../routes/Rhythmic')
);

const ImagesEngine = makeModule(() =>
    import(/* webpackChunkName: "ImagesEngine" */ '../routes/ImagesEngine')
);

const Routes: FC<{}> = () => (
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
