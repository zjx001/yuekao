var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb')
console.log(ObjectId)
const mongo = require('mongodb-curd')
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//查找
router.get('/api/getfind', function(req, res, next) {
    let { id } = req.query
    if (id) {
        mongo.find('yuekao', 'yue', { '_id': id }, function(re) {
            if (re) {
                res.send({ code: 1, data: re })
            } else {
                res.send({ code: 0, msg: 'error' })
            }
        })
    } else {
        mongo.find('yuekao', 'yue', function(re) {
            if (re) {
                res.send({ code: 1, data: re })
            } else {
                res.send({ code: 0, msg: 'error' })
            }
        })
    }

});
//删除
router.get('/api/delfind', function(req, res, next) {
    let { _id } = req.query
    mongo.remove('yuekao', 'yue', { '_id': _id }, function(re) {
        if (re) {
            res.send({ code: 1, msg: 'success' })
        } else {
            res.send({ code: 0, msg: 'error' })
        }
    })
});
//添加
router.post('/api/addfind', function(req, res, next) {
    let { user, tel, ads } = req.body
    if (!user || !tel || !ads) {
        res.send({ code: 2, msg: '参数不全' })
        return
    }
    mongo.insert('yuekao', 'yue', req.body, function(re) {
        if (re) {
            res.send({ code: 1, msg: 'success' })
        } else {
            res.send({ code: 0, msg: 'error' })
        }
    })
});

//修改
router.post('/api/datafind', function(req, res, next) {
    let { user, tel, ads, _id } = req.body
    console.log(_id)
    if (!user || !tel || !ads || !_id) {
        res.send({ code: 2, msg: '参数不全' })
        return
    }
    mongo.update('yuekao', 'yue', ({ '_id': ObjectId(_id) }, { 'user': user, 'tel': tel, 'ads': ads }), function(re) {
        if (re) {
            res.send({ code: 1, msg: 'success' })
        } else {
            res.send({ code: 0, msg: 'error' })
        }
    })
});
module.exports = router;