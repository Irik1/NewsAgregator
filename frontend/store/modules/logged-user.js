//пользователь который вошел в систему
import axios from 'axios'
import Vue from "vue";

export default {
    state: {
        loggedUser: null
    },

    mutations: {
        updateLoggedUser(state, loggedUser) {
            
            if(loggedUser && loggedUser.UserName) {

                localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            }
            
            state.loggedUser = loggedUser;
        }
    },

    actions: {
        async getUserFromDb(ctx, userData) {

            return new Promise(async (resolve, reject) => {

                    const response = await axios.post('/api/home/authorization', {
                        userName: userData.userName,
                        userPassword: userData.userPassword
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if(response.data.user === false || response.data.password === false) {
                        Vue.swal({
                            icon: "warning",
                            title: "Ошибка",
                            text: "Неверно введеный логин или пароль",
                        });
                    }

                    ctx.commit('updateLoggedUser', response.data);

                    resolve(response);
            });
            
        },

        getUserFromLocalStorage(ctx) {

            let userFromLocalStorage = JSON.parse(localStorage.getItem('loggedUser'));

            if(!userFromLocalStorage.Id) {

                throw new Error();
            }

            ctx.commit('updateLoggedUser', userFromLocalStorage);

            
        },

        resetLoggedUser(ctx) {
            ctx.commit('updateLoggedUser', null);
        }
    },

    getters: {
        getLoggedUser(state) {
            
            return state.loggedUser;
        }
    },
}