var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({
    explicitArray: false
});

var goodReadsService = function () {
    var getBookById = function (id, callback) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=4naNmK1aqHdsz1yhieimVQ'
        };

        var apiCallback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                parser.parseString(str, function (err, result) {
                    callback(null, result.GoodreadsResponse.book);
                });
            });
        };

        http.request(options, apiCallback).end();

    };
    return {
        getBookById: getBookById
    };

};

module.exports = goodReadsService;