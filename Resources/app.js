// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'ActiveRecord Test Suite',
    backgroundColor:'white'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Test Suite',
    window:win1
});

var data = [
  { title: "Open Database", url: 'tests/open_database.js' },
  { title: "Basic", url: 'tests/basic.js' },
  { title: "Callbacks", url: 'tests/callbacks.js' },
  { title: "Date", url: 'tests/date.js' },
  { title: "Finder", url: 'tests/finders.js' },
  { title: "Indicies", url: 'tests/indicies.js' },
  { title: "Migrations", url: 'tests/migrations.js' },
  { title: "Relationships", url: 'tests/relationships.js' },
  { title: "Serialization", url: 'tests/serialization.js' },
  { title: "Synchronization", url: 'tests/synchronization.js' },
  { title: "Transactions", url: 'tests/transactions.js' },
  { title: "Validations", url: 'tests/validations.js' },
  
  { title: "Benchmark", url: 'tests/benchmark.js' },
];

var tableView = Ti.UI.createTableView({
  data: data
});

tableView.addEventListener('click', function(e) { 
	var win = Ti.UI.createWindow( { url: e.rowData.url, title: e.rowData.title, hasDetail: true } );
	tab1.open(win,{animated:true});
});

win1.add(tableView);


tabGroup.addTab(tab1);  


// open tab group
tabGroup.open();
