const fs = require('fs');
const output = "output";
const parseData = require("./parse.js");



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

