import theme from '@styles/theme';

export default class Drawing {
    coords = [];
    radius = 5;
    heightCell = 58;
    widthCell = 55;

    canvas = null;
    ctx = null;

    calcRatio() {
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

    updateChart(heightCalc) {
        const ratio = this.calcRatio();

        this.canvas.width = this.canvas.offsetWidth * ratio;

        const recalculatedHeight = heightCalc(this.canvas.offsetWidth);

        this.canvas.height = recalculatedHeight * ratio;
        this.canvas.style.width = this.canvas.offsetWidth + 'px';
        this.canvas.style.height = recalculatedHeight + 'px';
        
        this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.ctx.fillStyle = theme[this.variant].primaryColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setCtx (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    setVariant (variant) {
        this.variant = variant;
    }

    getVariant () {
        return this.variant;
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
        note: { isAccented, char, frequents, notes },
        horizontal,
        vertical
    }) {
        vertical = vertical + 20;
        if (isAccented) {
            this.ctx.fillStyle = theme[this.variant].accentColor;
        }
        this.ctx.fillText(char, horizontal + 60, vertical);
        this.ctx.font = '10px Montserrat';
        this.ctx.fillStyle = theme[this.variant].grayColor;
        //this.ctx.fillText('Т', horizontal + 50, vertical);
        this.ctx.font = '20px Montserrat';
        this.ctx.fillStyle = theme[this.variant].secondColor;
        vertical = vertical + 20;
        this.ctx.fillText(notes, horizontal + 60, vertical);
        this.ctx.font = '10px Montserrat';
        this.ctx.fillStyle = theme[this.variant].grayColor;
        vertical = vertical + 12;
        this.ctx.fillText(frequents, horizontal + 60, vertical);
        this.ctx.font = '18px Montserrat';
        this.ctx.fillStyle = theme[this.variant].secondColor;
    }

    drawNotes({
        music,
        verticalOffset
    }) {
        const canvasWidth = this.canvas.offsetWidth;
        const canvasHeight = this.canvas.offsetHeight;

        this.ctx.textAlign = 'center';
        this.ctx.font = '18px Montserrat';

        this.ctx.fillStyle = theme[this.variant].primaryColor;

        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        this.ctx.fillStyle = theme[this.variant].secondColor;

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
                    stringIndex,
                    horizontal,
                    vertical
                });
                stringIndex++;
            }

            this.drawNote({ note, horizontal, vertical });

            this.coords.push({
                horizontal,
                vertical,
            });

            lastString = string;

            horizontal = horizontal + verticalOffset;
        });
    }

    drawStringNumber({ stringIndex, horizontal, vertical }) {
        this.ctx.font = '18px Montserrat';
        this.ctx.fillStyle = theme[this.variant].grayColor;
        this.ctx.fillText(stringIndex, horizontal + 8, vertical + 40);
        this.ctx.font = '18px Montserrat';
        this.ctx.fillStyle = theme[this.variant].secondColor;
    }

    drawNote({ note, horizontal, vertical }) {
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
            note: { notes, frequents, isAccented, char },
            horizontal,
            vertical
        });
    }
}
