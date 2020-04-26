import { connect } from 'react-redux';
import { changeTheme } from '@containers/Layout/layoutActions';

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
