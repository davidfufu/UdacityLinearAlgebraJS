var exports = module.exports = {};

exports.isNearZero = function(number, eps=1e-10){
	return Math.abs(number) < eps;
}

// let d = new Decimal();
// console.log(d.is_near_zero(0.00000000000000000004));

