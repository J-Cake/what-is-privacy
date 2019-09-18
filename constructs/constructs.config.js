const fs = require('fs'),
    path = require('path');

const comp = require('../utilities/MDCompiler')()
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-ins'));

const compile = md => comp.render(md);

module.exports = {
    "markdown": args => args.map(i => {
        const file = path.join(__dirname, 'markdown', i);
        console.log(file);

        if (fs.existsSync(file))
            return `<article>${compile(fs.readFileSync(file, 'utf8'))}</article>`;
        else
            return `<div class="error">The file "${file}" does not exist</div>`;

    }).join(`<br/>`),

    "script": args => args.map(i => {
        const file = path.join(__dirname, 'scripts', i);
        console.log(file);

        if (fs.existsSync(file))
            eval(fs.readFileSync(file, 'utf8'));
        else
            return `<div class="error">The file "${file}" does not exist</div>`;
    }).join(`<br/>`),

    "background": args => `
    <div class="background-img">
        <img src="${args[0]}"/>
    </div>
    <style>
        .background-img:before {background-image: url(${args[0]})}
    </style>`
};