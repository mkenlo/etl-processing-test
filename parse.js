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

module.exports = parseData;