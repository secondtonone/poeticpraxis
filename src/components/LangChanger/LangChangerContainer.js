import { connect } from 'react-redux';
import { changeTheme, changeLang } from '../Layout/LayoutActions';

import LangChanger from './LangChanger';

const mapDispatchToProps = {
    changeLang
};

const mapStateToProps = (state) => ({
    variant: state.Layout.variant,
    lang: state.Layout.lang
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LangChanger);
