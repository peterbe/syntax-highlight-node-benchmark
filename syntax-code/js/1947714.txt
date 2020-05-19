var queryableFunctions = {
  // example #1: get the difference between two numbers:
  getDifference: function(nMinuend, nSubtrahend) {
      reply('printStuff', nMinuend - nSubtrahend);
  },
  // example #2: wait three seconds
  waitSomeTime: function() {
      setTimeout(function() { reply('doAlert', 3, 'seconds'); }, 3000);
  }
};

// system functions

function defaultReply(message) {
  // your default PUBLIC function executed only when main page calls the queryableWorker.postMessage() method directly
  // do something
}

function reply() {
  if (arguments.length < 1) { throw new TypeError('reply - not enough arguments'); return; }
  postMessage({ 'queryMethodListener': arguments[0], 'queryMethodArguments': Array.prototype.slice.call(arguments, 1) });
}

onmessage = function(oEvent) {
  if (oEvent.data instanceof Object && oEvent.data.hasOwnProperty('queryMethod') && oEvent.data.hasOwnProperty('queryMethodArguments')) {
    queryableFunctions[oEvent.data.queryMethod].apply(self, oEvent.data.queryMethodArguments);
  } else {
    defaultReply(oEvent.data);
  }
};