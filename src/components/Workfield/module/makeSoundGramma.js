export default function makeSoundGramma(signId, string, accent) {
    let soundGramma = string.soundGramma;

    const indexSoundGramma = string.soundGramma.indexOf(signId);

    if (accent === 3 && indexSoundGramma !== -1) {
        soundGramma.splice(indexSoundGramma, 1);
    }
    if (accent < 3 && indexSoundGramma === -1) {
        soundGramma.push(signId);
    }

    return soundGramma;
}
