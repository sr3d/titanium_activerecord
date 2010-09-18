Ti.include('setup.js');

ActiveRecord.connect(ActiveRecord.Adapters.Titanium, "test_database");
ActiveRecord.execute('DROP TABLE IF EXISTS posts');
log('test_database is now opened');


Ti.include('success.js');