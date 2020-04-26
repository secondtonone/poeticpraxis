import { connect } from 'react-redux';
import { changeLang } from '@containers/Layout/layoutActions';

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
