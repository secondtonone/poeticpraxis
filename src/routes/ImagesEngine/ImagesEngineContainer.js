import { connect } from 'react-redux';
import { setEngineState, sharingText } from './ImagesEngineActions';
import { changeTheme } from '@containers/Layout/LayoutActions';

import ImagesEngine from './ImagesEngine';

const mapDispatchToProps = {
    setEngineState,
    sharingText,
    changeTheme
};

const mapStateToProps = (state) => ({
    engineState: state.ImagesEngine.currentEngineState,
    lang: state.Layout.lang
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagesEngine);
