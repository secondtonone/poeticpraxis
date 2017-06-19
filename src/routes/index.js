import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import Layout from '../components/Layout';
import Rhythmic from './Rhythmic';
import About from './About';
import ImagesEngine from './ImagesEngine';


/*export default () =>
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRedirect to="/images-engine"/>
            <Route path="/images-engine" component={ImagesEngine} />
            <Route path="/rhythmic" component={Rhythmic} />
            <Route path="/about" component={About} />
            <Route path="*" component={ImagesEngine}/>
        </Route>
    </Router>*/

export default {
    path: '/',
    component: Layout,
    indexRoute: {
        onEnter: (nextState, replace) => replace('/images-engine')
    },
    childRoutes: [
        About,
        Rhythmic,
        ImagesEngine,
        {
            path: '*',
            getComponent: ImagesEngine.getComponent
        }
    ]
};