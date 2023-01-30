const fs = require('fs');

function getData() {
    console.log("read data");

    fs.readFile("example.txt", (err, data) => {
        if (err) console.log(err);
        console.log(data.toString());
        jObj = JSON.parse(data.toString());
        writeProcessedData(transform(getData()), 'result-example.json')

    });
}

function transform(data) {
    console.log(data);
    return {
        "timestamp": data['ts'],
        "url_object": deconstructUrl(data['u']),
        "ec": data['e']
    };
}

function writeProcessedData(jsonObj, filename) {
    output = JSON.stringify(jsonObj);
    fs.writeFile(filename, output, error => {
        if (error) {
            console.log('Error writing file', err)
        } else {
            console.log(`Successfully wrote file: ${filename} `)
        }
    });
}

function deconstructUrl(urlString) {
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


getData()
