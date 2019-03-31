import { connect } from 'react-redux';
import { changeTheme, changeLang } from '../../components/Layout/LayoutActions';

import Settings from './Settings';

const mapDispatchToProps = {
    changeTheme,
    changeLang
};

const mapStateToProps = (state) => ({
    variant: state.Layout.variant,
    lang: state.Layout.lang
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
