Ti.include('setup.js');

ActiveRecord.connect(ActiveRecord.Adapters.Titanium, "test_database");
ActiveRecord.execute('DROP TABLE IF EXISTS posts');
// ActiveRecord.execute('SELECT 1 + 1');
log('test_database is now opened');