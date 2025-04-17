const path = require('path');
// const glob = require('glob');
const projects = require('./projects');
// const imgDefs = require('./imgDefs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const PurgecssPlugin = require('purgecss-webpack-plugin');

const project = projects['250414_GERUNDIO'];

console.log(path.resolve(__dirname, `./src/projects/${project.projectFolder}${project.outputProjectFolder}`));

module.exports = {
    mode: 'production',
    entry: `/src/${project.projectFolder}/js/${project.jsEntry}.js`,

    output: {
        path: path.resolve(__dirname, `./build`),
        filename: '[name].js',
        publicPath: './'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(scss|css)$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            /* publicPath: './' */
                            /* publicPath: '/fonts/' */
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
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
                test: /\.(otf|ttf|eot|woff|woff2)$/,
                type: "javascript/auto",
                use:{
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath:'fonts/',
                        /* outputPath: (...props)=>{
                            console.log(props)
                        }, */
                        publicPath: `${project.url}/fonts`,
                        esModule: false
                    }
                }
            },
            // {
            //     test: /\.(jpg|png)$/,
            //     use:{
            //         loader: 'sharp-loader',
            //         options:{
            //             name: '[name].[ext]',
            //             cacheDirextory: true,
            //             presets:{
                            
            //                 base:{
            //                     name: './img/[name].[ext]',
            //                     format: (meta)=>{
            //                         /* if(meta.hasAlpha){
            //                             return{ ...imgDefs.pngBase }
            //                         }
            //                         return { ...imgDefs.jpegBase } */
            //                         return{ ...imgDefs.pngBase }
            //                     },
            //                     width: 1200
            //                 },

            //                 large:{
            //                     name: './img/[name]_lg.[ext]',
            //                     format: (meta)=>{
            //                         /* if(meta.hasAlpha){
            //                             return{ ...imgDefs.pngBase }
            //                         }
            //                         return { ...imgDefs.jpegBase } */
            //                         return{ ...imgDefs.pngBase }
            //                     },

            //                     width: 800
            //                 },

            //                 medium:{
            //                     name: './img/[name]_md.[ext]',
            //                     format: (meta)=>{
            //                         /* if(meta.hasAlpha){
            //                             return{ ...imgDefs.pngBase }
            //                         }
            //                         return { ...imgDefs.jpegBase } */
            //                         return{ ...imgDefs.pngBase }
            //                     },
            //                     width: 600
            //                 },

            //                 small:{
            //                     name: './img/[name]_sm.[ext]',
            //                     format: (meta)=>{
            //                         /* if(meta.hasAlpha){
            //                             return{ ...imgDefs.pngBase }
            //                         }
            //                         return { ...imgDefs.jpegBase } */
            //                         return{ ...imgDefs.pngBase }
            //                     },
            //                     width: 400
            //                 },
            //             },
            //         }
            //     }
            // },
            {
                test: /\.(svg)$/,
                use:{
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath:'img/'
                    }
                }
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
            
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('src', `${project.projectFolder}/${project.pugEntry}.pug`),
            templateParameters: project.globals,
            /* template: path.resolve('src', 'projects/220616_L_MM/index.pug') */
            /* template: path.resolve('src', 'projects/220612_L_TE/index_v1.pug') */
            /* template: path.resolve('src', 'projects/220531_L_TC/index_v2.pug') */
            /* template: path.resolve('src', 'layout/index.pug') */
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        // new PurgecssPlugin({
        //     paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,
        //         {
        //             nodir: true
        //         }
        //     )
        // })
    ]
}