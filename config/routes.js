/**
 * Created by d3vilroot on 16-5-15.
 */

'use strict';

var articleCtrl = require('../controllers/article.js');

module.exports = function(app) {

    app.post('/api/visitor',                articleCtrl.create);

};