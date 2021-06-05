<template>
    <layout name="default">
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">
                            <p class="text-center h2 glav-text mt-3">
                                Контакты
                                <button type="button" class="btn btn-primary btn-sm h6 float-right" @click="$router.push('/home')">
                                    Назад
                                </button>
                            </p>
                            <div class="row mt-5">
                                <div class="col-md-12">
                                    <div class="row align-items-center">
                                        <div class="col-md-12 align-self-center pt-2 pb-2">
                                            <h4 class="mainTitle font-weight-bold border-bottom pl-4 ">
                                                Сокращенное наименование:
                                                <span style="margin-bottom:2px"
                                                    class="align-self-center textbody font-weight-normal">
                                                    Главстат ДНР
                                                </span>
                                            </h4>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-md-12 pt-2 pb-2 align-self-center ">
                                            <h4 class="mainTitle font-weight-bold border-bottom pl-4">
                                                Адрес:
                                                <span class="textbody font-weight-normal" style="margin-bottom:2px">
                                                    283048, г. Донецк, ул. Университетская, 89
                                                </span>
                                            </h4>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-md-12 pt-2 pb-2 align-self-center ">
                                            <h4 class="mainTitle font-weight-bold border-bottom pl-4">
                                                Электронный адрес:
                                                <span class="textbody font-weight-normal" style="margin-bottom:2px">
                                                    info@stat.govdnr.ru
                                                </span>
                                            </h4>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-md-12 pt-2 pb-2 align-self-center ">
                                            <h4 class="mainTitle font-weight-bold border-bottom pl-4">
                                                Веб-сайт:
                                                <span class="textbody font-weight-normal" style="margin-bottom:2px">
                                                    <a href="http://glavstat.govdnr.ru/" target="_blank">
                                                        http://glavstat.govdnr.ru/
                                                    </a>
                                                </span>
                                            </h4>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-md-12 pt-2 pb-2 align-self-center ">
                                            <h4 class="mainTitle font-weight-bold border-bottom pl-4">
                                                Телефон приемной:
                                                <span class="textbody font-weight-normal" style="margin-bottom:2px">
                                                    (62) 311-63-89
                                                </span>
                                            </h4>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-md-12 pt-2 pb-2 align-self-center ">
                                            <h4 class="mainTitle font-weight-bold border-bottom pl-4">
                                                Телефон для обращений граждан:
                                                <span class="textbody font-weight-normal" style="margin-bottom:2px">
                                                    (62) 303-22-71
                                                </span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
    import layout from 'components-folder/layouts';

    export default {
        name: `contacts`,
        title: 'Контакты',
        components: {
            layout
        },
    }
</script>