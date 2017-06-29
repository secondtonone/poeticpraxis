const PromiseFtp = require('promise-ftp');
const fs = require('fs');

const config = {
  user: 'u0263016_second',
  password: 'secondt0', // optional, prompted if none given
  host: '37.140.192.213',
  port: 21
      /*localRoot: __dirname + '/dist',
      remoteRoot: '/www/poeticpraxis.ru/'*/
      /*include: ['build/version.txt'],
      exclude: ['.git', '.idea', 'tmp/*', 'build/*']*/
}

const remotePath = '/www/poeticpraxis.ru';

const ftp = new PromiseFtp();

fs.readdir('./dist/', (err, files) => {
    console.log('Directory local:');
    files.forEach(file => {

        console.log(file);
    });
})

ftp.connect(config)
.then(function(serverMessage) {

    console.log('Server message: ' + serverMessage);
    return ftp.list('/www/poeticpraxis.ru');

}).then(function(list) {

    console.log('Directory listing:');

    return new Promise(function (resolve, reject) {

        list.map(function(item) {
            if(item.type !== 'd') {
                console.log(remotePath + '/' + item.name);
            } else {
                console.log(remotePath + '/' + item.name);
            }
        });

        resolve();

    });


}).then(function() {


}).then(function(list) {

    return ftp.end();
});
