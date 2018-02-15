var BigNumber = require('bignumber.js');
var Decimal = require('decimal.js');


var lib = process.argv[2];
var isNative = lib !== 'big' && lib !== 'dec';

var decimalPlaces = process.argv[3] && parseInt(process.argv[3])|| 20;
BigNumber.config({ DECIMAL_PLACES:  decimalPlaces})

var const108 = getNumber(108);
var const815 = getNumber(815);
var const1500 = getNumber(1500);
var const4 = getNumber(4);
var const4d25 = getNumber(17/4); // 4.25

function getNumber(number) {
	if (lib === 'big') {
		return new BigNumber(number);
	} else if (lib === 'dec') { 
		return new Decimal(number);
	} else {
		return number;
	}
}

function f(y, z) {
	if (isNative) {
		return 108 - (815-1500/z)/y;
	}

	return const108.minus(const815.minus(const1500.dividedBy(z)).dividedBy(y));
}

function x(i) {
	if (i === 0) {
		return const4;
	}

	if (i === 1) {
		return const4d25;
	}

	return f(x(i-1), x(i-2));
}


function calc() {
	var table = [];
	var N = 30;

	for (var i = 0; i < N; i++) {
		console.log('%d\t%d', i, x(i));
	}
}

calc();