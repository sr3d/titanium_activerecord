/* include the dist version
  cd into activerecord folder, run
  $ rake dist to build
*/
Ti.include('test_helper.js');
Ti.include('../../activejs/assets/downloads/active_record.js');

ActiveRecord.logging  = true;
ActiveRecord.autoMigrate = true;
ActiveSupport.log     = Ti.API.debug;
ActiveRecord.connect(ActiveRecord.Adapters.Titanium);



ActiveRecord.execute('DROP TABLE IF EXISTS posts');
ActiveRecord.execute('DROP TABLE IF EXISTS comments');
ActiveRecord.execute('DROP TABLE IF EXISTS users');
ActiveRecord.execute('DROP TABLE IF EXISTS credit_cards');
ActiveRecord.execute('DROP TABLE IF EXISTS string_dates');
ActiveRecord.execute('DROP TABLE IF EXISTS dates');
ActiveRecord.execute('DROP TABLE IF EXISTS articles');
ActiveRecord.execute('DROP TABLE IF EXISTS categories');
ActiveRecord.execute('DROP TABLE IF EXISTS categorizations');
ActiveRecord.execute('DROP TABLE IF EXISTS field_type_testers');
ActiveRecord.execute('DROP TABLE IF EXISTS singular_table_name');
ActiveRecord.execute('DROP TABLE IF EXISTS custom_table');
ActiveRecord.execute('DROP TABLE IF EXISTS guid');
ActiveRecord.execute('DROP TABLE IF EXISTS reserved');

//define Posts via SQL
ActiveRecord.execute('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY,user_id,title,body)');
var Post = ActiveRecord.create('posts');
Post.belongsTo('user',{ counter: 'post_count' });
Post.hasMany('comments',{ dependent: true });


//define Comments via Migrations
var Comment = ActiveRecord.create('comments',{
    title: '',
    post_id: 0,
    user_id: 0,
    body: {
        type: 'text',
        value: ''
    },
    test: {},
    test_2: []
});
Comment.validatesPresenceOf('title');
Comment.belongsTo('user');
Comment.belongsTo(Post);

CreditCard = ActiveRecord.create('credit_cards',{
    number: 0
});

var User = ActiveRecord.create('users',{
    name: '',
    password: '',
    comment_count: 0,
    post_count: 0,
    credit_card_id: 0
});
//you can mix and match singular, plural, camelcase, normal
User.hasMany('Comment',{
    dependent: true
});
User.hasMany('posts',{
    dependent: true
});
User.hasOne(CreditCard,{
    dependent: true
});

var ModelWithStringDates = ActiveRecord.create('string_dates',{
    name: '',
    created: '',
    updated: ''
});

var ModelWithDates = ActiveRecord.create('dates',{
    name: '',
    created: {
        type: 'DATETIME'
    },
    updated: {
        type: 'DATETIME'
    }
});

var Article = ActiveRecord.create('articles',{
    name: ''
});
Article.hasMany('Categorization');
Article.hasMany('Category',{
    through: 'Categorization'
});

var Category = ActiveRecord.create('categories',{
    name: ''
});
Category.hasMany('Categorization');
Category.hasMany('Article',{
    through: 'Categorization'
});

var Categorization = ActiveRecord.create('categorizations',{
    article_id: 0,
    category_id: 0
});
Categorization.belongsTo('Article',{
    dependent: true
});
Categorization.belongsTo('Category',{
    dependent: true
});

var FieldTypeTester = ActiveRecord.create('field_type_testers',{
    string_field: '',
    number_field: 0,
    default_value_field: 'DEFAULT',
    boolean_field: true,
    custom_type_field: {
        type: 'MEDIUMTEXT'
    },
    custom_type_field_with_default: {
        type: 'MEDIUMTEXT',
        value: 'DEFAULT'
    }
});

var SingularTableName = ActiveRecord.create('singular_table_name',{
    string_field: ''
});

log('Should created SingularTableName');

var Custom = ActiveRecord.create({
    tableName: 'custom_table',
    modelName: 'Orange'
},{
    custom_id: {
        primaryKey: true
    },
    name: ''
});

var Guid = ActiveRecord.create('guid',{
    guid: {
        primaryKey: true,
        type: 'VARCHAR(255)'
    },
    data: ''
});

var Reserved = ActiveRecord.create('reserved',{
    to: { primaryKey: true },
    from: '',
    select: ''
});


log('done setup.js');
