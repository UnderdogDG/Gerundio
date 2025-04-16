const path = require('path');
const projects = require('./projects');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const project = projects['250414_GERUNDIO'];

// const pages = project.pages.map(page=>new HtmlWebpackPlugin({
//     template: path.resolve('src', `projects/${project.projectFolder}/pages/${page.file}.pug`),
//     filename: `${page.name}.html`,
//     templateParameters: project.globals
// }));

module.exports = {
    mode: 'development',
    entry: `./src/${project.projectFolder}/js/${project.jsEntry}.js`,
    output: {
        filename: '[name].js',
        // publicPaht: './',
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                // use: {
                //     loader: 'pug-loader',
                //     options: {
                //         globals: [
                //             {
                //                 FB_PAGE: "https://www.facebook.com/cgveron"
                //             }
                //         ]
                //     }
                // },
                use: ['pug-loader'],
            },
            {
                test: /\.(jpg|svg|png)$/,
                use:{
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath:'img/'
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader',
            },
            {
                test: /\.(scss|css)$/,
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: ()=>[
                                require('precss'),
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test: /\.(glsl|ys|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'raw-loader'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src', `${project.projectFolder}/index.pug`),
            templateParameters: project.globals,
            // filename: '../about.html'
        })
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, `./public`)
        },
        liveReload: true,
        open: true
    }
}