var Client = require('ftp');
var fs = require('fs');

var config = {
    user: 'u0263016_second',
    password: 'secondt0', // optional, prompted if none given
    host: '37.140.192.213',
    port: 21
    /*localRoot: __dirname + '/dist',
    remoteRoot: '/www/poeticpraxis.ru/'*/
    /*include: ['build/version.txt'],
    exclude: ['.git', '.idea', 'tmp/*', 'build/*']*/
}

var c = new Client();

c.on('ready', function() {
    c.cwd('www/poeticpraxis.ru', function(){
        c.list(function(err, list) {
            if (err) throw err;
            console.dir(list.length);
            c.end();
        });
    });

});
// connect to localhost:21 as anonymous
c.connect(config);