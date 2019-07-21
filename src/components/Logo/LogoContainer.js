import { connect } from 'react-redux';

import Logo from './Logo';

const mapStateToProps = (state) => ({
    variant: state.Layout.variant
});

export default connect(
    mapStateToProps
)(Logo);
