var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objId = require('mongodb').ObjectID;

var bookRouter = express.Router();
var books = [];
var router = function (nav) {
    var bookService = require('../services/goodReadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.route('/')
        .get(function (req, res) {
            bookController.getIndex(req, res);
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            bookController.getById(req, res);
        });

    return bookRouter;
};

module.exports = router;