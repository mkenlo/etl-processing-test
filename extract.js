
(async function () {

    // Make sure we got a filename on the command line.
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
    }
    const input = process.argv[2];

    const fs = require('fs');
    const gunzip = require('gunzip-file');
    const StreamZip = require('node-stream-zip');
    const output = "output";

    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
    }

    let extract = async (file) => {

        const zip = new StreamZip.async({ file: file });

        if (!fs.existsSync("tmp")) {
            fs.mkdirSync("tmp")
        }
        const entries = await zip.entries();
        for (const entry of Object.values(entries)) {

            await zip.extract(entry.name, './tmp');

        }
        await zip.close();
        console.log("extract successfull...")
    }

    let unzipJsonFiles = async () => {
        fs.readdirSync('tmp').map(entry => {
            let filename = entry.split('.', 2);
            gunzip(`./tmp/${entry}`, `./tmp/${filename[0]}.txt`);

        });
        //  cleanup : remove all gzip files
        /*     fs.readdirSync('tmp').map(entry => {
                fs.unlinkSync(`./tmp/${entry}`)
            }); */
        console.log("unzip all files successfull...")
    }



    await extract(input);
    await unzipJsonFiles();


}())