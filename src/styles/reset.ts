const reset = `html {
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
fieldset,
input,
button,
textarea,
p,
blockquote,
th,
td {
    padding: 0;
    margin: 0;
}

a {
    text-decoration: none;
    color: #181311;
}

fieldset,
img {
    border: 0;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}


ul, ol {
    list-style: none;
}

address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
    font-weight: normal;
    font-style: normal;
}

caption,
th {
    text-align: left;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: normal;
    font-size: 100%;
}

q:before,
q:after {
    content: '';
}

abbr,
acronym {
    border: 0;
}

button:focus {
    outline: none;
}`;

export default reset;
