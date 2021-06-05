<template>
    <div class="news">

        <div class="wrapper">
            <header style="background-color: #32BAEC;">
            </header>
            <nav class="sticky-top main_menu">
            <div class="table-responsive-sm">
              <table class="table">
              <tbody>
                <tr>
                  <th rowspan="2"><img class="img-fluid logo" src="../assets/shared/images/logo.png" /></th>
                  <td colspan="4">Краткая информация о пользователе</td>
                  <td><router-link to="/home">Вход/Регистрация/Выход</router-link></td>
                </tr>
                <tr>
                  <td><router-link to="/respondent">Игры</router-link></td>
                  <td><router-link to="/respondent/respondent-personal-data-edit">Образование</router-link></td>
                  <td><router-link to="/respondent/forms">Политика</router-link></td>
                  <td><router-link to="/respondent/history">Спорт</router-link></td>
                  <td><router-link to="/respondent/respondent-profile">Настольные игры</router-link></td>
                </tr>
              </tbody>
              </table>
            </div>    
            </nav>

            <div class="content-wrapper">
                <div class="container">
                    <div class="row">
                          <!-- <div class="col-md-2">
                                Список
                          </div>
                          <div class="col-md-2">
                                Блок
                          </div> -->
                          <input type="text" placeholder="Заголовок новости" class="search">
                          <!-- <div class="com-md-12">

                          </div> -->
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
                                        
                                        <div class="row mt-4"> 
                                          <div class="col">
                                            <a>
                                              <span class="card-title">Перейти к обсуждению</span>
                                            </a>
                                            <div class="ya-share2" data-curtain data-shape="round" data-services="vkontakte,facebook,telegram,twitter"
                                            :data-title="news.header" :data-url="news.link" :data-image="news.image" data-lang="ru"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                        </div>

                        <!-- <div>
                            <b-table table-class='tableFilingNews'
                                    ref="tableFilingNews"
                                    style="white-space: pre-wrap"
                                    hover bordered small
                                    :tbody-tr-class="'text-center'"
                                    :thead-class="'text-center thead_background'"
                                    :select-mode="'single'"
                                    :busy="isBusy"
                                    :items="allNews"
                                    :fields="items"
                                    :selected-variant="''"
                                    :per-page="perPage"
                                    :current-page="currentPage"
                                    primary-key="_id">
                                <template #cell(index)="row">
                                    {{ row.index + (perPage*(currentPage-1)) +1 }}
                                </template>
                                <template #table-busy>
                                    <div class="text-center text-danger my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{messageBusy}}</strong>
                                    </div>
                                </template>
                            </b-table>
                            <div v-if="totalRows > perPage || !(currentPage = 1)" class="row justify-content-between mt-3">
                                <div class="col-md-auto">
                                    <b-pagination v-model="currentPage"
                                                  :total-rows="totalRows" :per-page="perPage"
                                                  first-text="Первая"
                                                  prev-text="Назад"
                                                  next-text="Вперед"
                                                  last-text="Последняя">
                                    </b-pagination>
                                </div>

                            </div>
                        </div> -->
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
        // Дата хранится в виде числа. Не обязательно в state компонента. Но и в других местах тоже
        date: 1580558031264,
        allNews: [],
        visibleNews: [],
                
        //ПАРАМЕТРЫ ТАБЛИЦЫ
        isBusy: true,
        messageBusy: "Загрузка данных...",
        perPage: 1000,
        currentPage: 1,
        transProps: {
        // Transition name
          name: ''
        },
      }),
      computed: {

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
          // this.transProps.name = 'flip-list';
          this.restoreCurrentPage();
      },
      watch: {
          currentPage: function () {
          sessionStorage.setItem('currentPage', this.currentPage);
          }
      },

      methods:{
        async updateNews(){
          const response = await axios.get('/api/find-news/');
          this.allNews = response.data;
          this.visibleNews = _.clone(this.allNews);
          console.log(response);

          this.isBusy = false;
        },

        changeOutlook(){

        },

        changeRate(){

        },

        showComments(){

        },

        commentNews(){

        },

        authModal(){

        },

        register(){

        },

        auth(){

        },

        exit(){

        },

        socialNetworkPublish(){

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
    /* @import 'animate.css/animate.min.css'; */
</style>