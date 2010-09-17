// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var data = [
  { title: "Open Database", url: 'tests/open_database.js' }
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
// tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
