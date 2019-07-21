import { connect } from 'react-redux';
import { changeTheme } from '../Layout/LayoutActions';

import ThemeTumbler from './ThemeTumbler';

const mapDispatchToProps = {
    changeTheme
};

const mapStateToProps = (state) => ({
    variant: state.Layout.variant,
    lang: state.Layout.lang
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemeTumbler);
