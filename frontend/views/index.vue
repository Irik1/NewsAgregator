<template>
    <div class="news">
        <div data-app>
        </div>
                       <v-dialog v-model="comments" width="600px">
                        <v-card>
                          <v-card-title class>
                            <span class="headline" id="commentsHeader">Новость</span>
                          </v-card-title> 
                            <v-card-actions>
                              <v-container>
                                <v-col cols="12" class="selfComment">
                                  <v-text-field v-model="comment" label="Введите комментарий" @change="commentNews()"></v-text-field>
                                </v-col>
                                <div v-for="comm in NewsComments" :key="comm._id">
                                      <div :v-if="comm.user == 'Me'">
                                          <v-col cols="12" class="selfComment">
                                            <v-list-item-title class="selfAuthor">Вы</v-list-item-title>
                                            <v-list-item-title>Сообщение</v-list-item-title>
                                          </v-col>
                                      </div>
                                      <div :v-if="comm.user != 'Me'">
                                            <v-col cols="12">
                                              <v-list-item-title v-text="comm.user">Логин</v-list-item-title>
                                              <v-list-item-title v-text="comm.text">Сообщение</v-list-item-title>
                                            </v-col>
                                      </div>
                                </div>

                                <v-col cols="12">
                                  <v-list-item-title>Логин</v-list-item-title>
                                  <v-list-item-title>Сообщение</v-list-item-title>
                                </v-col>
                                <v-col cols="12" class="selfComment">
                                  <v-list-item-title class="selfAuthor">Вы</v-list-item-title>
                                  <v-list-item-title>Сообщение</v-list-item-title>
                                </v-col>
                                <v-col cols="12">
                                  <v-list-item-title>Логин</v-list-item-title>
                                  <v-list-item-title>Сообщение</v-list-item-title>
                                </v-col>
                                <v-col cols="12">
                                  <v-list-item-title>Логин</v-list-item-title>
                                  <v-list-item-title>Сообщение</v-list-item-title>
                                </v-col>
                                <v-col cols="12">
                                  <v-list-item-title>Логин</v-list-item-title>
                                  <v-list-item-title>Сообщение</v-list-item-title>
                                </v-col>
                              </v-container>
                            </v-card-actions>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="comments = false">Выйти</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
        <div class="wrapper">
            <header style="background-color: #32BAEC;">
            </header>
            <nav class="main_menu">
            <div class="table-responsive-sm">
              <table class="table">
              <tbody>
                <tr>
                  <th rowspan="2"><img class="img-fluid logo" src="../assets/shared/images/logo.png" /></th>
                  <td colspan="4">
                    <!-- Личный кабинет -->
                    <!-- Если пользователь авторизован -->
                    <div v-if="1">
                      <v-dialog v-model="settings" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            text
                          >
                            Личный кабинет
                          </v-btn>
                        </template>
                        <v-card>
                          <v-toolbar dark color="primary">
                            <v-btn icon dark @click="settings = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Личный кабинет</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                              <v-btn dark text @click="settings = false">Сохранить настройки</v-btn>
                            </v-toolbar-items>
                          </v-toolbar>
                          <v-list three-line subheader>
                            <v-subheader>Основные данные</v-subheader>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>Никнейм</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>Логин</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>Пароль</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                          <v-divider></v-divider>
                          <v-list three-line subheader>
                            <v-subheader>Настройки отображения новостей</v-subheader>
                            <v-list-item>
                              <v-list-item-action>
                                <v-checkbox v-model="update"></v-checkbox>
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>Обновлять новости в реальном времени (может нагрузить память компьютера)</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-action>
                                <v-checkbox v-model="minusRate"></v-checkbox>
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>Выводить записи с отрицательным рейтингом</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-dialog>
                  </div>                   
                  <div v-else>
                    Авторизуйтесь, чтобы тут появился личный кабинет!
                  </div>

                  </td>
                  <td>
                    <div v-if="1">
                      <v-row justify="center">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              text
                            >
                              Авторизация
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">Введите логин и пароль, чтобы войти в систему</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-col cols="12">
                                  <v-text-field label="Логин" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                  <v-text-field label="Пароль" type="password" required></v-text-field>
                                </v-col>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                @click="register = !register"
                              >
                                Регистрация
                              </v-btn>
                              <v-btn color="blue darken-1" text @click="dialog = false">Назад</v-btn>
                              <v-btn color="blue darken-1" text @click="loginButton()">Войти</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>

                        <v-dialog v-model="register" persistent max-width="600px">
                          <v-card>
                            <v-card-title>
                              <span class="headline">Регистрация</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-col cols="12">
                                  <v-text-field label="Логин" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                  <v-text-field label="Пароль" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field label="Подтвердите пароль" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field label="Email" required></v-text-field>
                                </v-col>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="register = false">Назад</v-btn>
                              <v-btn color="blue darken-1" text @click="registerButton()">Создать аккаунт</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-row>
                    </div>
                    <div v-else>
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            text
                          >
                            Выйти из аккаунта
                          </v-btn>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><v-btn text @click="updateNews('Игры')">Игры</v-btn></td>
                  <td><v-btn text @click="updateNews('Образование')">Образование</v-btn></td>
                  <td><v-btn text @click="updateNews('Политика')">Политика</v-btn></td>
                  <td><v-btn text @click="updateNews('Спорт')">Спорт</v-btn></td>
                  <td><v-btn text @click="updateNews('Настольные игры')">Настольные игры</v-btn></td>
                </tr>
              </tbody>
              </table>
            </div>    
            </nav>

            <div class="content-wrapper">
                <div class="container">
                    <div class="row">
                          <input type="text" placeholder="Поиск по заголовку" class="search" v-model="searchField" @change="updateNews()">
                    </div>
                    <label></label>
                    <div class="preloader">
                        <div class="transition-loader">
                            <div class="transition-loader-inner">
                                <p>Идет обработка, не перезагружайте страницу!</p>
                                <label></label>
                                <label></label>
                                <label></label>
                                <label></label>
                                <label></label>
                                <label></label>
                            </div>
                        </div>
                    </div>
                    <div class="row no-gutters">
                      <div class="col">
                        <div v-for="news in allNews" :key="news._id">
                                <div class="card">
                                  <div class="card-image">
                                    <div class="row">
                                      <div class="col-md-3">
                                          <a :href="news.link">
                                            <div v-if="news.image != ''">
                                              <img :src="news.image" width="230" height="150">
                                            </div>
                                            <div v-else>
                                                <img src="../assets/shared/images/logo.jpg" width="230" height="150">
                                            </div>
                                          </a>
                                      </div>
                                      <div class="col-md-9">
                                        <span class="card-title">{{ news.header }}</span>
                                        
                                        <div class="row mt-5"> 
                                          <div class="col">
                                            <v-card-actions>
                                              <span>Рейтинг новости: {{ news.rate }}</span>
                                              <b-link class="ml-1" style="color:green" @click="changeRate('+', news._id)">↑</b-link>
                                              <b-link class="ml-1" style="color:red" @click="changeRate('-', news._id)">↓</b-link>
                                            <v-spacer></v-spacer>
                                            
                                            <v-btn :id="news._id"
                                              text
                                              @click="comments = !comments"
                                            >
                                              Перейти к обсуждению новости
                                            </v-btn>
                                            <div class="ya-share2" data-curtain data-shape="round" data-services="vkontakte,facebook,telegram,twitter"
                                            :data-title="news.header" :data-url="news.link" :data-image="news.image" data-lang="ru"></div>
                                            </v-card-actions>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    
</template>

<script>                                            
    import layout from 'components-folder/layouts';
    import axios from 'axios';
    import _ from 'lodash';

    export default {
      title: 'Новостной агрегатор Rubik',
        data: () => ({
        login: "",
        password: "",
        passwordConfirmation: "",
        email: "",
        dialog: false,
        comments: false,
        settings: false,
        register:false,

        allNews: [],
        visibleNews: [],

        NewsComments: [],
                
        //ПАРАМЕТРЫ ТАБЛИЦЫ
        isBusy: true,
        messageBusy: "Загрузка данных...",
        searchField: '',
        theme: "Игры",
        comment: "",
        user:'',

        minusRate:'',
        update:'',

      }),
      computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},

        totalRows() {
          return this.visibleNews.length;
        },

        layout() {
          return this.$route.meta.layout || 'default-layout'
        },
      localeDate() {
            // toLocaleDateString() или toLocaleString() или toLocaleTimeString()
             return (new Date(this.date)).toLocaleTimeString() 
        },
    },

      async created() {
          this.intervalId = setInterval(() => {this.updateNews()}, 30000); // Обновляем таблицу раз в 30 секунд
          await this.updateNews();
          this.restoreCurrentPage();
      },
      watch: {
          currentPage: function () {
            sessionStorage.setItem('currentPage', this.currentPage);
          }
      },

      methods:{
        async updateNews(theme){
          if (theme)
            this.theme = theme;
          let data = {
            header: this.searchField,
            theme: this.theme
          };
          const response = await axios.post('/api/find-news/',data);
          this.allNews = response.data;
          this.visibleNews = _.clone(this.allNews);
          this.isBusy = false;
        },

        async changeRate(indicator,id){
            let data = {
              indicator: indicator,
              id: id,
            };
            await axios.post('/api/change-rate/',data);
            this.updateNews();
        },

        async showComments(id){
            const response = await axios.get('/api/show-comments/' + id);
            this.comments = response.data;
        },

        async commentNews(id){
            let data = {
              user: "",
              id: "",
              comment: this.comment,
            }
            await axios.post('/api/comment-news/',data);
        },

        loginButton(){
          console.log("Логинимся");
           let email = this.email;
           let password = this.password;
           this.$store.dispatch('login', { email, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
        },

        registerButton(){
          console.log("Регистрируемся!");
          let data = {
              name: this.name,
              email: this.email,
              password: this.password
            };
            this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
        },

        async logout(){
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')});
        },

      restoreCurrentPage() { //восстановление страницы на которой находился пользователь (пагинация)
             if (!sessionStorage.getItem('currentPage')) {
                 this.currentPage = 1;
            } else {
                this.currentPage = sessionStorage.getItem('currentPage');
          }
      },
      },

      // Если повесили таймер, то его нужно отключать
      beforeDestroy() {
          if (this.intervalId) clearInterval(this.intervalId)
      },

      mounted(){
          let recaptchaScript = document.createElement('script');
          recaptchaScript.setAttribute('src', 'https://yastatic.net/share2/share.js');
          document.head.appendChild(recaptchaScript);
      }


    };
</script>

<style>
    @import 'assets-folder/home/styles/index.css';
    @import 'bootstrap/dist/css/bootstrap.css';
    @import 'bootstrap/dist/css/bootstrap-reboot.min.css';
    @import 'bootstrap-vue/dist/bootstrap-vue.css';
    @import 'assets-folder/shared/styles/font-awesome.min.css';
    @import 'assets-folder/shared/styles/main.css';
    @import 'assets-folder/shared/styles/sweetalert2.min.css';
</style>