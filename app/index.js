import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
/*import Menu from './menu.jsx';*/
import App from './app.jsx';
import Table from './table.jsx';
import About from './about.jsx';
import imageEngine from './imageEngine.jsx'


render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/app" />
            <Route path="/app" component={Table} />
            <Route path="/image-engine" component={imageEngine} />
            <Route path="/about" component={About} />
        </Route>
    </Router>), document.getElementById('app')
);

//render(<Menu />, document.getElementById('navigation'));

/*render(<WorkField />, document.getElementById('work-field-container'));*/