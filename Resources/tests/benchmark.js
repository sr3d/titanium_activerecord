Ti.include('setup.js');


ActiveRecord.logging = false;
var iterationsCount = 1000;

Benchmark("ActiveRecord CREATE", function() { 
  for( var i = 0; i < iterationsCount; i++) {
    User.create({ name: 'sr3d', password: '123456' } );
  };
});

Benchmark("ActiveRecord SELECT", function() { 
  for( var i = 0; i < iterationsCount; i++) {
    User.findByName('sr3d');
  }
});


Benchmark("Raw SELECT", function() { 
  for( var i = 0; i < iterationsCount; i++) {
    ActiveRecord.connection.db.execute("SELECT * FROM users WHERE name = ?", 'sr3d');
  }
});


Benchmark("Raw CREATE", function() { 
  for( var i = 0; i < iterationsCount; i++) {
    ActiveRecord.connection.db.execute('INSERT INTO users ("password","name") VALUES (?,?)', 123456,'sr3d');
  };
});



Ti.include('success.js');