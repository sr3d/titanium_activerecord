Ti.include('setup.js');

// ensure singular table name model can write / read
// var a = SingularTableName.create({string_field: 'test'});
// assert(SingularTableName.find(a.id).string_field == 'test','Singular table names supported.');

//Comment is defined by ActiveRecord, Post is defined by SQL
var a = new Comment({
    title: 'a',
    body: 'aa'
});
log(a);
// assert(a.title == 'a','Record correctly initialized.');

var b = Comment.create({
    title: 'b',
    body: 'bb'
});
log(b);
assert(b.title == 'b','Record correctly initialized with create().');
assert(b.id > 0,'Record has id.');
assert(Comment.find(b.id).title == 'b','Record persisted.');

var c = Comment.create({
    title: 'c',
    body: 'cc'
});
assert(c.id == b.id + 1,'Record incremented id.');
assert(Comment.find(c.id).title == 'c','Record persisted.');
assert(Comment.count() == 2,'Record count is correct.');
assert(Comment.count({
    where: {
        title: 'c'
    }
}) == 1,'Record count with conditions is correct.');


assert(b.id == Comment.first().id,'Calculations: first()');
assert(c.id == Comment.last().id,'Calculations: last()');
assert(3 == Comment.sum('id'),'Calculations: sum()')
assert(1 == Comment.min('id'),'Calculations: min()')
assert(2 == Comment.max('id'),'Calculations: max()')

assert(c.get('title') == 'c','set()')
c.set('title','ccc');
assert(c.get('title') == 'ccc' && c.title == 'ccc','set() basic');

c.set('save','test');
assert(c.save != 'test' && c.get('save') == 'test','set() does not override protected parameter');

c.reload();
assert(c.title == 'c' && c.get('title') == 'c' && typeof(c.save) == 'function','reload()');

c.updateAttribute('title','ccc');
assert(c.title == 'ccc' && c.get('title') == 'ccc' && Comment.find(c.id).title == 'ccc','updateAttribute()');

c.set('title','cccc');
c.save();
var _c = Comment.find(c.id);
assert(_c.title == 'cccc' && _c.title == 'cccc' && c.id == _c.id,'save()');

var count = Comment.count();
c.destroy();
assert(!c.reload() && count - 1 == Comment.count(),'destroy()');

//create with an id preserves id and still acts as "created"
var called = false;
Comment.observeOnce('afterCreate',function(){
    called = true;
});
var d = Comment.create({
    id: 50,
    title: 'd',
    body: 'dd'
});
d.reload();
assert(d.id == 50 && called,'create with an id preserves id and still acts as "created"');

Comment.destroy('all');
assert(Comment.count() == 0,'destroy("all")');
