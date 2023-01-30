const fs = require('fs');
const output = "output";


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

transform()
console.log(`Output Folder: ${output}`);