
(async function () {
    var fs = require('fs')
    const StreamZip = require('node-stream-zip');
    const gunzip = require('gunzip-file');
    const zip = new StreamZip.async({ file: "input.zip" });

    if (!fs.existsSync("tmp")) {
        fs.mkdirSync("tmp")
    }
    const entries = await zip.entries();
    for (const entry of Object.values(entries)) {

        await zip.extract(entry.name, './tmp'); // extract in current dir
        //let filename = entry.name.split('/')[1].split('.', 2);
        //gunzip(`${filename.join('.')}`, `${filename[0]}.txt`); // unzip gzip file

    }
    await zip.close();
    fs.readdirSync('tmp').map(entry => {
        let filename = entry.split('.', 2);
        console.log(filename)
        gunzip(entry, `${filename[0]}.txt`, function () {
            console.log("extract done")
        }); // unzip gzip file
    });

}())



