
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

        console.log("extract successfull...")
    }

    let unzipJsonFiles = async () => {
        console.log("unzip all files successfull...")
    }

    let deconstructUrl = (urlString) => {
        let url = new URL(urlString);

        let urlObj = {
            "domain": url.hostname,
            "path": url.pathname,
            "hash": url.hash,
            "query_object": {}
        }
        for (const [key, value] of url.searchParams) {
            urlObj["query_object"][key] = value
        }
        return urlObj;
    }

    let parseData = (data) => {
        return {
            "timestamp": data['ts'],
            "url_object": deconstructUrl(data['u']),
            "ec": data['e']
        };
    }

    let writeOutputFile = (data, filename) => {
        text = JSON.stringify(data);
        fs.writeFile(`${output}/${filename}`, text, error => {
            if (error) {
                console.log('Error writing file', err)
            } else {
                console.log(`Successfully wrote file: ${output}/${filename}`)
            }
        });


    }

    let transform = async () => {
        fs.readdirSync('tmp').map(entry => {
            fs.readFile(`./tmp/${entry}`, (err, data) => {
                if (err) console.log(err);
                if (entry.endsWith('.txt')) {
                    jObj = JSON.parse(data.toString());
                    let filename = entry.split('.')[0] + '.json';
                    writeOutputFile(parseData(jObj), filename);
                }


            });

        });

    }

    await extract(input);
    await unzipJsonFiles();
    await transform();

    console.log(`Output Folder: ${output}`);
}())