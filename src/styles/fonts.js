const fontWeightsMontserrat = [
    {
        weight: 200,
        font: 'Montserrat-ExtraLight'
    },
    {
        weight: 300,
        font: 'Montserrat-Light'
    },
    {
        weight: 400,
        font: 'Montserrat-Regular'
    },
    {
        weight: 500,
        font: 'Montserrat-Medium'
    }
];


/* const fontWeightsMaterialIcons = [
    {
        weight: 400,
        font: 'MaterialIcons-Regular'
    }
]; */

const fontFace = (name, fontWeight, font) => {
    return `
        @font-face {
            font-family: "${name}";
            src:  
                url('${require(`../fonts/${name}/${font}.woff2`)}') format('woff2'),
                url('${require(`../fonts/${name}/${font}.woff`)}') format('woff') ,
                url('${require(`../fonts/${name}/${font}.ttf`)}') format('truetype') ;
            font-weight: ${fontWeight};
            font-style: normal;
            font-display: optional;
        }
    `;
};

const fontMontserrat = fontWeightsMontserrat
    .map(({ weight, font }) => {
        return fontFace('Montserrat', weight, font);
    })
    .join('');

/* const fontMaterialIcons = fontWeightsMaterialIcons
    .map(({ weight, font }) => {
        return fontFace('Material Icons', weight, font);
    })
    .join(''); */

export default `
    ${fontMontserrat}
`;
