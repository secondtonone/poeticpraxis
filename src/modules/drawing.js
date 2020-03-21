import theme from '@styles/theme';

export default class Drawing {
    coords = [];
    radius = 5;
    heightCell = 58;
    widthCell = 55;
    static calcRatio() {
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

    setCtx (ctx) {
        this.ctx = ctx;
    }

    setVariant (variant) {
        this.variant = variant;
    }
    clearIndicator (index) {
        const { vertical, horizontal } = this.coords[index];
        this.ctx.clearRect(
            horizontal + this.widthCell,
            vertical + this.heightCell,
            this.radius * 2,
            this.radius * 2
        );
    }
    drawIndicator(index) {
        const { vertical, horizontal } = this.coords[index];

        const radius = this.radius;
        const heightCell = this.heightCell;
        const widthCell = this.widthCell;

        if (index === 0) {
            this.clearIndicator(this.coords.length - 1);
        }
        if(index > 0) {
            this.clearIndicator(index - 1);
        }
        
        
        this.ctx.fillStyle = theme[this.variant].accentColor;
        //this.ctx.fillRect(horizontal + 30, vertical + 58, 50, 5);
        this.ctx.beginPath();
        this.ctx.arc(
            horizontal + widthCell + radius,
            vertical + heightCell + radius,
            radius,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }
    drawCell({
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

    drawNotes({
        ctx,
        music,
        variant,
        canvasWidth,
        canvasHeight,
        verticalOffset
    }) {
        ctx.textAlign = 'center';
        ctx.font = '18px Montserrat';

        ctx.fillStyle = theme[variant].primaryColor;

        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = theme[variant].secondColor;

        this.coords = [];

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
                this.drawStringNumber({
                    ctx,
                    stringIndex,
                    horizontal,
                    vertical,
                    variant
                });
                stringIndex++;
            }

            this.drawNote({ ctx, note, horizontal, vertical, variant });

            this.coords.push({
                horizontal,
                vertical,
            });

            lastString = string;

            horizontal = horizontal + verticalOffset;
        });
    }

    drawStringNumber({ ctx, stringIndex, horizontal, vertical, variant }) {
        ctx.font = '18px Montserrat';
        ctx.fillStyle = theme[variant].grayColor;
        ctx.fillText(stringIndex, horizontal + 8, vertical + 40);
        ctx.font = '18px Montserrat';
        ctx.fillStyle = theme[variant].secondColor;
    }

    drawNote({ ctx, note, horizontal, vertical, variant }) {
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

        this.drawCell({
            ctx,
            note: { notes, frequents, isAccented, char },
            horizontal,
            vertical,
            variant
        });
    }
}
