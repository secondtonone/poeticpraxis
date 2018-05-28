import { connect } from 'preact-redux';
import { changeTheme } from '../../components/Layout/LayoutActions';

import Settings from './Settings';

const mapDispatchToProps = {
    changeTheme
};

const mapStateToProps = (state) => ({
    variant: state.Layout.variant
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
