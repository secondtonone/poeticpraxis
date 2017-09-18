import { connect } from 'preact-redux'
import { setEngineState } from './ImagesEngineActions'

import ImagesEngine from './ImagesEngine'


const mapDispatchToProps = {
    setEngineState
}

const mapStateToProps = (state) => ({
    engineState: state.ImagesEngine.currentEngineState
})


export default connect(mapStateToProps, mapDispatchToProps)(ImagesEngine)