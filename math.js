var exports = module.exports = {};

exports.isNearZero = function(number, eps=1e-10){
	return Math.abs(number) < eps;
}

// let d = new Decimal();
// console.log(d.is_near_zero(0.00000000000000000004));


exports.round = function(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

exports.isZero = function(v, tolerance=1e-10) {
		if (v ==0 ){ return 0}
		else if (v < tolerance && v > 0) {return 0}
		else {return v};
}

exports.radToDeg = function(rad) {
	return rad * (180/Math.PI);
}

exports.degToRad = function(degree) {
	return degree/180*Math.PI;
}

exports.notZero = function(n) {
	n = +n;  // Coerce to number.
	if (!n) {  // Matches +0, -0, NaN
 	throw new Error('Invalid dividend ' + n);
	}
  return n;
}

// console.log(exports.radToDeg(0.7853981633974483));
// console.log(exports.degToRad(45));

//num1 is the number being compared
//num2 is used with the margin to set up a range
exports.close = function(num1,num2,margin=2) {
	if (num1 >= num2-margin && num1 <= num2+margin) {
		return true;
	} else false;
}

// console.log(exports.close(89,90));
// var y = exports.close(this.angle,90,5);