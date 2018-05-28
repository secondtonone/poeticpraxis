import { connect } from 'preact-redux';
import { setEngineState, sharingText } from './ImagesEngineActions';
import { changeTheme } from '../../components/Layout/LayoutActions';

import ImagesEngine from './ImagesEngine';

const mapDispatchToProps = {
    setEngineState,
    sharingText,
    changeTheme
};

const mapStateToProps = (state) => ({
    engineState: state.ImagesEngine.currentEngineState
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesEngine);
