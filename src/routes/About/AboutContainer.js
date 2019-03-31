import { connect } from 'react-redux';

import About from './About';

const mapStateToProps = (state) => ({
    lang: state.Layout.lang,
    variant: state.Layout.variant
});

export default connect(mapStateToProps)(About);
