var test = require('./build/index').default;
var main = new test();
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

var processPi = function(err, pi){
    //console.log(pi);
    main.searchDigits(7, pi);
};


fs.readFile('./app/pi/pi', 'utf8', processPi);

