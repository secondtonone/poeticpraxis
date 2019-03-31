import theme from '../styles/theme';

export function calcRatio() {
    let ctx = document.createElement('canvas').getContext('2d'),
        dpr = window.devicePixelRatio || 1,
        bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
    return dpr / bsr;
}

export function drawCell({
    ctx,
    note: { isAccented, char, frequents, notes },
    horizontal,
    vertical,
    variant
}) {
    vertical = vertical + 20;
    if (isAccented) {
        ctx.fillStyle = theme[variant].accentColor;
    }
    ctx.fillText(char, horizontal + 60, vertical);
    ctx.font = '10px Montserrat';
    ctx.fillStyle = theme[variant].grayColor;
    //ctx.fillText('Т', horizontal + 50, vertical);
    ctx.font = '20px Montserrat';
    ctx.fillStyle = theme[variant].secondColor;
    vertical = vertical + 20;
    ctx.fillText(notes, horizontal + 60, vertical);
    ctx.font = '10px Montserrat';
    ctx.fillStyle = theme[variant].grayColor;
    vertical = vertical + 12;
    ctx.fillText(frequents, horizontal + 60, vertical);
    ctx.font = '18px Montserrat';
    ctx.fillStyle = theme[variant].secondColor;
}

export function drawNote({ ctx, note, horizontal, vertical, variant }) {
    let notes = '';
    let frequents = '';
    let string = note.string;

    note.vowelNotes.forEach((note) => {
        if (note.notation) {
            notes = `${notes}${note.notation}`;
            frequents = `${frequents}  ${note.note}hz`;
        }
    });

    const char = note.char;

    const isAccented = note.isAccented;

    drawCell({
        ctx,
        note: { notes, frequents, isAccented, char },
        horizontal,
        vertical,
        variant
    });
}

export function drawStringNumber({
    ctx,
    stringIndex,
    horizontal,
    vertical,
    variant
}) {
    ctx.font = '18px Montserrat';
    ctx.fillStyle = theme[variant].grayColor;
    ctx.fillText(stringIndex, horizontal + 8, vertical + 40);
    ctx.font = '18px Montserrat';
    ctx.fillStyle = theme[variant].secondColor;
}

export function drawNotes({
    ctx,
    music,
    variant,
    canvasWidth,
    verticalOffset
}) {
    

    ctx.textAlign = 'center';
    ctx.font = '18px Montserrat';
    ctx.fillStyle = theme[variant].secondColor;

    let horizontal = 0;

    let vertical = 0;

    let lastString = '';

    let stringIndex = 1;

    music.forEach((note) => {
        let string = note.string;

        if (
            horizontal >= canvasWidth - verticalOffset ||
            (lastString && !(string === lastString))
        ) {
            vertical = vertical + verticalOffset;
            horizontal = 0;
        }

        if (string !== lastString) {
            drawStringNumber({
                ctx,
                stringIndex,
                horizontal,
                vertical,
                variant
            });
            stringIndex++;
        }

        drawNote({ ctx, note, horizontal, vertical, variant });

        lastString = string;

        horizontal = horizontal + verticalOffset;
    });
}
