import { connect } from 'preact-redux'
import { setRhytmicState } from './RhythmicActions'

import Rhythmic from './Rhythmic'


const mapDispatchToProps = {
    setRhytmicState
}

const mapStateToProps = (state) => ({
    rhythmicState: state.Rhythmic.currentRhythmicState
})


export default connect(mapStateToProps, mapDispatchToProps)(Rhythmic)