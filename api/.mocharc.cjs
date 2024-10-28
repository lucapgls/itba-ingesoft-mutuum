// .mocharc.js
module.exports = {
    require: ['@babel/register'],
    env: [
        'NODE_ENV=test'
    ],
    ignore: [
        'node_modules/**/*'
    ],

    // config
    spec: 'test/**/*.test.js', 
    timeout: 10000,
    reporter: 'nyan',
    colors: true,
    pendingTests: true,
    fullTrace: true,
    bail: false,
    slow: 1000,

};