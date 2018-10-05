import { connect } from 'preact-redux';

import About from './About';

const mapStateToProps = (state) => ({
    lang: state.Layout.lang
});

export default connect(
    mapStateToProps
)(About);
