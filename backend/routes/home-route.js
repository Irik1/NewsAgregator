const homeController = require('../controllers/home-controller.js');

module.exports = function(app) {
    
    // Retrieve all Users
    app.post('/api/home/authorization', homeController.authorization);
    app.get('/api/download-file/:fileId', homeController.downloadFile);
}