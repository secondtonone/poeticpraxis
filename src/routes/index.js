import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import Layout from '../components/Layout';
import Rhythmic from './Rhythmic';
import About from './About';
import ImagesEngine from './ImagesEngine';


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