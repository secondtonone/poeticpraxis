import { connect } from 'react-redux';

import Layout from './Layout';
import { changeTheme, changeLang } from './layoutActions';

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
)(Layout);
