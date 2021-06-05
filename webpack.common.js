const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const argParser = require("yargs-parser");

const args = argParser(process.argv.slice(2));

module.exports.args = args;

const client = {
    target: 'web',
    entry: {
        build: ['./frontend/index', ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/front'),
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                      esModule: false,
                      transformAssetUrls: {
                        a: 'href'
                      }
                    }
                }],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    },
                }],
            },
            {
              test: /\.(doc|docx)$/,
              use: [{
                  loader: 'file-loader',
                  options: {
                      esModule: false,
                      name: '[hash]/[name].[ext]'
                  },
              }],
          }
        ],
    },
    resolve: {
        alias: {
            "views-folder": path.resolve(__dirname, "frontend/views"),
            "form-controls-folder": path.resolve(__dirname, "frontend/components/form-controls"),
            "assets-folder": path.resolve(__dirname, "frontend/assets"),
            "mixins-folder": path.resolve(__dirname, "frontend/components/mixins"),
            "components-folder": path.resolve(__dirname, "frontend/components"),
            "controllers-folder": path.resolve(__dirname, "backend/controllers"),
            "frontend-folder": path.resolve(__dirname, "frontend"),
            "helpers-folder": path.resolve(__dirname, "frontend/helpers"),
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new FaviconsWebpackPlugin('frontend/assets/shared/icons/favicon.ico')
    ],
};

const mergeStrategy = {
    client: {
        "module.rules.use": "prepend"
    },
};

const htmlOptions = {
    /*  inject: false, */
    template: require('html-webpack-template'),
    title: "Главное управление статистики Донецкой Народной Республики",
    links: [{
            rel: 'icon',
            href: 'dist/front/favicon.ico',
            sizes: '16x16',
            type: 'image/png'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=cyrillic'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Jura:400,500,600'
        },
    ],
    appMountId: 'app',
    lang: 'ru',
    mobile: true,
};

function pickCfg(clientCfg, serverCfg) {

    const {
        clientOnly,
        serverOnly
    } = args;

    if (serverOnly && clientOnly)
        throw TypeError("--server-only and --client-only combining not allowed!");

    if (clientOnly) return clientCfg;
    if (serverOnly) return serverCfg;

    return [clientCfg, serverCfg]
};

module.exports = {
    config: {
        client
    },
    mergeStrategy,
    htmlOptions,
    pickCfg,
    args,
    // resolve: {
    //     fallback:{
    //       "stream": require.resolve("stream-browserify"),
    //     }
    //   },
};