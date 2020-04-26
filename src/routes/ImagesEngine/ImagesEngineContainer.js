import { connect } from 'react-redux';
import { setEngineState, sharingText } from './imagesEngineActions';
import { changeTheme } from '@containers/Layout/layoutActions';

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
