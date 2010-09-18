function log(msg) { 
  Ti.API.debug(msg);
};

function assert(obj, msg) { 
  if( !obj ) {
    throw msg;
  };
};

function assertEqual(expected, actual, msg) {
  if( expected != actual ) {
    throw new Error("Expected " + expected + 'but got' + actual);
  }
};


Benchmark = function( msg, block ) {
  var startTime = (new Date()).getTime();
  block();
  var endTime   = (new Date()).getTime();
  log( msg + " takes " + (endTime - startTime) + 'ms' ); 
};
