import { connect } from 'react-redux';
import { setEngineState } from './imagesEngineActions';
import { setRhythmicState } from '@routes/Rhythmic/rhythmicActions';
import { changeTheme } from '@containers/Layout/layoutActions';

import ImagesEngine from './ImagesEngine';

const mapDispatchToProps = {
    setEngineState,
    sharingText: setRhythmicState,
    changeTheme
};

const mapStateToProps = (state) => ({
    engineState: state.ImagesEngine.currentEngineState,
    lang: state.Layout.lang,
    rhythmicText: state.Rhythmic.currentRhythmicState.text
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagesEngine);
