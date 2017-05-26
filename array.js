var exports = module.exports = {};

//CHECKS IF THE ARE THE EXACT SAME IN TERMS OF DATA
exports.equal = function(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
	}
	for (var i = 0; i < arr1.length; i++) {
		for (var j = 0; j < arr2.length; j++) {
			if (arr1[i] !== arr2[j]) {
				return false;
			}
		}
	}
	return true;

}
//CHECKS IF NOT EMPTY, NO UNDEFINED OR NULL VALUES, AND IF AN ARRAY
exports.validate = function(arr) {
	var pass = true;
	try {
		if (!(arr instanceof Array)) {
			throw "Error, Coordinates must be in an array.";
		}

		if (arr.length == 0) {
			throw "Error, Coordinates must be non-empty."
		}

		for (let coord of arr) {
			if (coord == undefined || coord == null) {
				throw "Error,Coordinate values must not be null or undefined."

			}
		}

	} catch (err) {
		console.log(err);
		pass = false;
	}
	if (pass) {
		// console.log('this array is validated');
		return true

	} else { return false}
}
//CHECKS IF THE SAME LENGTH
exports.sameLength = function(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
	} else {
		return true;
	}
}
//given at least one arrays, or many all within one array, must be 2D
exports.arrayOfAllArraySizes = function(args) {
	return args.reduce((acc, arr) => {return acc.concat(arr.length)},[]);
}

//must be called on the array given by multiArraySizes
exports.areAllSameSize = function(array){
	return array.every(function(element, index, array) {
		return element == array[0];
	});
}

//given a 2d array of arrays, will return the largest array
exports.largestArray = function(args){
	return args.reduce((acc, arr) => {return (arr.length > acc.length) ? arr : acc});
}

exports.flattenArray = function(array) {
	return array.reduce( (a, b) => {return a.concat(b);},[]);
}

exports.sameInside = function(array) {
	// return array.every((current,index,array) => {return current == array[0];});
	for (var i = 0; i < array.length; i++) {
		if (array[0] !== array[i]) {
			return false;
		}
	}
	return true;
}