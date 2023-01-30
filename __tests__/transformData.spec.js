const parseData = require("../parse.js");

describe("Transform Json Object", () => {
    test("the object should have new keys ", () => {
        const input = {
            "ts": 123456789,
            "u": "http://www.example.com/path1/path2?param1=value1&param2=value2#hashtag1#hashtag2",
            "e": "test"
        }
        const output = {
            "timestamp": 123456789,            // same timestamp as parent
            "url_object": {                    // parsed URL object
                "domain": "www.example.com",   // domain
                "path": "/path1/path2",        // path
                "query_object": {
                    "param1": "value1",
                    "param2": "value2"
                },
                "hash": "#hashtag1#hashtag2",           // hash
            },
            "ec": "test"
        }
        expect(parseData(input)).toEqual(output);
    })
});