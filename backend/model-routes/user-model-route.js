module.exports = function(app) {
 
    const userModelController = require('../model-controllers/user-model-controller.js');
 
    // Вывести все новости
    app.post('/api/find-news', userModelController.findNews);

    // Регистрация
    app.post('/api/register', userModelController.register);

    // Авторизация
    app.post('/api/auth', userModelController.auth);

    // Вывести все новости
    app.get('/api/show-comments/:newsId', userModelController.showComments);

    // Обновить настройки пользователя
    app.put('/api/update-user', userModelController.updateUser);

    // Сохранить комментарий к новости
    app.post('/api/comment-news', userModelController.commentNews);

    // Изменить рейтинг новости
    app.post('/api/change-rate/', userModelController.changeRate);

    app.del('/api/logout/', userModelController.logout)


//     // Update a User with Id
//     app.put('/api/update-user-by-id/:userId', userModelController.update);

//     // Delete a User with Id
//     app.delete('/api/delete-user-by-id/:userId', userModelController.delete);


}