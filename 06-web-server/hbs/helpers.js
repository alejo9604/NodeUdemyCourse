const hbs = require('hbs');

//helpers
hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('capitalizar', (text) => {

    let words = text.split(' ');
    
    words.forEach( (element, idx) => {
        words[idx] = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    });

    return words.join(' ');
})
