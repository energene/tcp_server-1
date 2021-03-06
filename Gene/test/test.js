var net = require('net');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
require(__dirname + '/../lib/server.js');

// test generates lists of files before writing and after writing, and then
// compares list lengths to see if the write created another file
describe('testing the tcp server', () => {
  var oldCount;
  var newCount;
  before((done) => {
    var list = fs.readdirSync(__dirname + '/../requests');// do this first to get old count
    oldCount = list.length;
    var client = net.connect({ port: 3000 }, // create a temp TCP client server
      () => {
        client.write('Let\'s send this data, COWABUNGA!');
      }
    );
    client.on('data', () => { // close after writing data so it doesn't hang
      client.end();
      done(); // for async close
    });
  });

  after('clean up', () => {
    var list = fs.readdirSync(__dirname + '/../requests/');
    list.map((f) => {
      fs.unlink(__dirname + '/../requests/' + f);
    });
  });

  it('should show we have a new file made', () => {
    var newList = fs.readdirSync(__dirname + '/../requests');
    newCount = newList.length;
    expect(newCount).to.eql(oldCount + 1);
  });
});
