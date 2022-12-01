import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`


  html, body, div, span,
h1, h2, h3, p,
a, address, img, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas,  
figure, footer, header, 
menu, nav, section {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside,
footer, header, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}


table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
	color: black;
	text-decoration: none;
	outline:none;
}

`;

export default GlobalStyle;
