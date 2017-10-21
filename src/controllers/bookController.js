var mongodb = require('mongodb').MongoClient;
var ObjId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {
    var getIndex = function (req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function (err, result) {
                res.render('booksListView', {
                    title: 'Books',
                    nav: nav,
                    books: result
                });
            });
        });
    };

    var getById = function (req, res) {
        var id = new ObjId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({
                _id: id
            }, function (err, result) {
                if (result.bookId) {
                    bookService.getBookById(result.bookId,
                        function (err, book) {
                            result.book = book;
                            res.render('booksView', {
                                title: 'Books',
                                nav: nav,
                                book: result
                            });
                        });
                } else {
                    res.render('booksView', {
                        title: 'Books',
                        nav: nav,
                        book: result
                    });
                }

            });
        });
    };
    return {
        getIndex: getIndex,
        getById: getById
    };
};

module.exports = bookController;