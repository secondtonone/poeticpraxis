import React from 'react';
import ReactDOM from 'react-dom';
import WorkField from './workField.jsx';
import Menu from './routing.jsx';
import '../scss/style.scss';


ReactDOM.render(<Menu />, document.getElementById('navigation'));
ReactDOM.render(<WorkField />, document.getElementById('work-field-container'));

/*ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
      </Route>
   </Router>

), document.getElementById('navigation'));*/