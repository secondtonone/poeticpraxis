import { connect } from 'react-redux';
import { setRhythmicState, setWordsDictionary } from './RhythmicActions';

import Rhythmic from './Rhythmic';

const mapDispatchToProps = {
    setRhythmicState: setRhythmicState,
    setWordsDictionary
};

const mapStateToProps = (state) => ({
    rhythmicState: state.Rhythmic.currentRhythmicState,
    wordsDictionary: state.Rhythmic.wordsDictionary,
    variant: state.Layout.variant,
    lang: state.Layout.lang
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rhythmic);
