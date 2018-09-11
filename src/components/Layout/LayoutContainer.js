import { connect } from 'preact-redux';

import Layout from './Layout';

const mapStateToProps = (state) => ({
    variant: state.Layout.variant,
    lang: state.Layout.lang
});

export default connect(mapStateToProps)(Layout);
