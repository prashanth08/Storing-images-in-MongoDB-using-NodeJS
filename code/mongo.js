var MongoClient = require('mongodb').MongoClient
    , format = require('util').format,
    fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  
    //should be triggered by the user upload button
  put();

  //triggered after the upload/button click
  res.writeHead(200, {'Content-Type': 'text/html'});

  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    
      collection.find().toArray(function(err, results) {
        //console.dir(results);
        // Let's close the db
        //ret = results[0];

        console.log(results[0]);
        res.end('<img alt="sample" src="data:image/png;base64,' +  results[0].image + '">');
        db.close();
      });
  });
  

  //res.end("Hello World\n");
}).listen(8000);

function read() {
   var image_base64 = fs.readFileSync('prash.png').toString('base64');

   return image_base64;
//console.log(base64_data);
}


function put() {
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    collection.insert({image: read()}, function(err, docs) {
          console.log("data inserted");

          db.close();
    });
  });
}

function get() {
  var ret;
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    
      collection.find().toArray(function(err, results) {
        //console.dir(results);
        // Let's close the db
        ret = results[0];
        db.close();
      });
  });

  return ret;
}

/*

  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    collection.insert({a: base64_data}, function(err, docs) {

      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
      });
    });
  });
  */
