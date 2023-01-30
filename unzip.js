
(async function () {
    const gunzip = require('gunzip-file');
    const fs = require('fs');

    fs.readdirSync('tmp').map(entry => {
        let filename = entry.split('.', 2);
        gunzip(`./tmp/${entry}`, `./tmp/${filename[0]}.txt`, function () {
            console.log("extract done")
        });

    });
    fs.readdirSync('tmp').map(entry => {
        fs.unlinkSync(`./tmp/${entry}`)

    });
}())

