module.exports = function(app) {
 
    const userModelController = require('../model-controllers/user-model-controller.js');
 
    // Вывести все новости
    app.get('/api/find-news', userModelController.findNews);

    // Регистрация
    app.post('/api/register', userModelController.register);

    // Авторизация
    app.post('/api/auth', userModelController.auth);

    // Смена пароля
    app.put('/api/change-password', userModelController.changepassword);

    // Обновить настройки пользователя
    app.put('/api/update-user', userModelController.updateUser);

    // Сохранить комментарий к новости
    app.post('/api/comment-news', userModelController.commentNews);

    // Изменить рейтинг новости
    app.put('/api/change-rate', userModelController.changeRate);

    


//     // Update a User with Id
//     app.put('/api/update-user-by-id/:userId', userModelController.update);

//     // Delete a User with Id
//     app.delete('/api/delete-user-by-id/:userId', userModelController.delete);


}