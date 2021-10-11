let fs = require('fs');
let path = require('path');


function noExtension(str) {
    return str.split('.html').join('');
}

let NamedPaths = {};
for (let a of [
    'Corrugatedboxes',
    'PolyBags',
    'Shrinkfilm',
    'Stretchfilm',
    'Tape',
]) {
    let dir = path.resolve(__dirname, a);
    let indexFile = '/' + a.toLowerCase() + '/' + fs.readdirSync(dir).find(o => o.toLowerCase() == a.toLowerCase() + '.html');
    let al = a;
    if (al[al.length - 1] == 's') {
        al = al.substr(0, al.length - 1);
    }
    if (a == 'Corrugatedboxes') {
        al = al.substr(0, al.length - 1);
    }
    let nm = 'categories';
    let pth = path.resolve(dir, al + nm);
    let dirs = fs.readdirSync(pth).filter(o => o.includes('html'));
    // console.log({ indexFile, dirs })
    let obj = {
        '': noExtension(indexFile),
    };
    for (let x of dirs) {
        obj[noExtension(path.basename(x))] = '/' + al + nm + '/' + noExtension(x);
    }
    // console.log(dirs);
    NamedPaths[a] = obj;
}

fs.writeFileSync(__dirname + "/dirs.js", JSON.stringify(NamedPaths));