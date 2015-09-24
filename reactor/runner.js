// =============== FILL THE DATA IN THIS AREA ===============
var apiKey = 'INSERT YOUR OPERATOR API KEY HERE';

// UNCOMMENT ONE PARTICULAR EVENT FUNCTION YOU ARE USING
// AND FILL IT USING THE TEMPLATES
var event =
// {
//     function: 'onActionCreated',
//     event: {
//         "action": {} //ActionDocument
//     }
// };

// {
//     function: 'onProductPropertiesChanged',
//     event: {
//         "product": {}, // ProductDocument,
//         "changes": {} // ChangesDocument
//     }
// };

// {
//     function: 'onThngPropertiesChanged',
//     event: {
//         "thng": {}, // ThngDocument
//         "changes": {} // ChangesDocument
//     }
// };
// ==========================================================

var EVT = require('evrythng-extended');

function getLogger(level) {
    return function(msg) {
        var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(datetime + ' [' + level + '\t]: ' + msg);
    }
}

var logger = {
    debug: getLogger('debug'),
    info: getLogger('info'),
    warn: getLogger('warn'),
    error: getLogger('error')
};

global.EVT = EVT;
global.app = new EVT.Operator(apiKey);
global.done = function() {};
global.logger = logger;

try {
    var reactor = require('./main.js');
    if (reactor[event.function]) {
        reactor[event.function](event.event);
    } else {
        console.log("There are no event functions in the reactor script to execute.");
    }
} catch (e) {
    logger.error('Could not execute reactor script: ' + e.message);
}