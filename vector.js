var arr = require('./array');
var Arith = require('./math');
class Vector {
	static isZero(v, tolerance=1e-10) {
		return (v.magnitude() < tolerance);
	}
	constructor(coords) {


		if (arr.validate(coords)) {
			this.coords = coords;
		}

		// a built in function that takes in another Vector to compare if equal
		this.isEqualTo = function(otherVector) {
			if (arr.validate(otherVector.coords)) {
				return (arr.equal(this.coords, otherVector.coords)) ? true : false;
			} else {

				console.log("The other Vector is invalid.");
				return false;
			}

		}

		this.add = function(otherVector) {
			//check if the other vector coords is valid and if they are the same length
			if (arr.validate(otherVector.coords) && arr.sameLength(this.coords,otherVector.coords)) {
				let coord1 = this.coords,
				coord2 = otherVector.coords;
				var resultCoords = coord1.map((currentV, index, array) => {return Arith.safeZero(coord1[index] + coord2[index])});
				return new Vector(resultCoords);

			} else {
				console.log("The other Vector is invalid.");
				return null;
			}
		}

		this.subtract = function(otherVector) {
			if (arr.validate(otherVector.coords) && arr.sameLength(this.coords,otherVector.coords)) {
				let coord1 = this.coords,
				coord2 = otherVector.coords;
				var resultCoords = coord1.map((currentV, index, array) => {
					// console.log(coord1[index] - coord2[index]);
					let subtractR = Arith.round(Arith.isZero(coord1[index] - coord2[index]),3);
					// console.log(subtractR);
					return subtractR;
				});
				return new Vector(resultCoords);

			} else {
				console.log("The other Vector is invalid.");
				return null;
			}
		}

		this.scalarM = function(factor) {
			var resultCoords = this.coords.map((currentV, index, array) => {return Arith.round((this.coords[index]*factor),5)});
			return new Vector(resultCoords);
		}

		this.magnitude = function()  {
			return Math.sqrt(this.coords.reduce((acc, v) => {return acc + v*v},0));
		}

		//returns a unit vector class instance that was obtained through normalization
		this.normalization = function() {
			// console.log(this.magnitude());
			if(this.magnitude() === 0) {
				console.log("Error, magnitude is 0. Zero Vector present");
				return null;
			} else {
				var newCoords = this.coords.map((value) => {return value*(1/this.magnitude())});
				return new Vector(newCoords);
			}
		}

		this.dotProduct = function(otherVector){
			// var otherArray = (otherVector instanceof Vector) ? otherVector.coords : (Array.isArray(otherVector)) ? otherVector : null;
			var otherArray = otherVector.coords;
			var dot = this.coords.reduce((acc, v, i, arr) => {return (acc + (this.coords[i] * otherArray[i]))},0);
			// console.log("dot product:", dot);
			return dot;

		}
		// MY SHITTy ONE
		this.angle = function(otherVector, in_Degrees=false) {
			var otherArray = otherVector.coords;
			var numerator = this.dotProduct(otherVector);
			var i = this.magnitude();
			var j = otherVector.magnitude();
			var denominator = this.magnitude()*otherVector.magnitude();
			var x = (numerator/denominator);

				// console.log("This is the thing before radian", x);
			// console.log("This is the radians", Math.acos(x), "This is the degrees", Arith.radToDeg(Math.acos(x)));
			return in_Degrees ? (Arith.radToDeg(Math.acos(x))) : Math.acos(x);

		}

		this.isOrthogonalTo = function(otherVector, tolerance=1e-10){
			// console.log("This is the angle between the two vectors",(this.angle(otherVector, true))," 90 is orthogonal", "the dot product is ", this.dotProduct(otherVector));
			//we test for two conditions of orthogonalness: 1 the dot product between the two is zero, and the angle between the two vectors is 90
			return (this.dotProduct(otherVector) < tolerance && this.dotProduct(otherVector) >= 0) ? true : (Arith.close(this.angle(otherVector,true), 90)) ? true : false;
		}
		//MYPARALLEL
		this.isParallelTo = function(otherVector) {
			//two vectors are parallel if they are scalar multiples of each other
			//we use a reduce to create an array of quotients from the operation of the respective index value in both coords arrays dividing each other.
			//if the numbers in the array are all the same, then it is obvious that they are scalar multiples of each other
			var result = this.coords.reduce((acc, current, i, array) => {return acc.concat(this.coords[i]/otherVector.coords[i])}, []).map((current, index, array)=>{
				//the reduce array is then mapped to check for zero vectors [0,0,0] which if were used as the denominator in the above reduce division will create an infinity value in the array
				//if they aren't infinity, we just round then to three decimals
				if (!isFinite(current)) {
					return current;
				} else {
					return Arith.round(current,3);
				}
			});
			//finally we check if all the values in the array of scalar factors is the same, making the vectors parallel
			return arr.sameInside(result);

		}


		// MY SOLUTION
		// this.orthogonalComponent = function(otherVector) {
		// 	//find a vector orthogonal to a given basis vector
		// 	let hypoMag = this.magnitude();
		// 	let angle_between = this.angle(otherVector, true);
		// 	console.log(hypoMag);
		// 	console.log(angle_between);
		// 	let oppositeMag = hypoMag * Math.sin(angle_between);
		// 	console.log("opposite:", oppositeMag);
		// }
		this.orthogonalComponentTo = function(basis) {
			let projection = this.parallelComponentTo(basis);
			// console.log("This is the perpendicular component: ", this.subtract(projection).coords);
			return this.subtract(projection);
		}

		this.parallelComponentTo = function(basis) {
			let u = basis.normalization();
			let weight = this.dotProduct(u);
			// console.log("This is the parallel component: ", u.scalarM(weight).coords);
			return u.scalarM(weight);
		}

		this.crossProduct = function(otherVector) {
			if (this.coords.length !== 3 || otherVector.coords.length !== 3) {
				console.log("Coords must be 3d only");
				return null;
			} else {
				let i = this.coords;
				let j = otherVector.coords;
				let crossP = [(i[1]*j[2] - j[1]*i[2]),-(i[0]*j[2] - j[0]*i[2]),(i[0]*j[1] - j[0]*i[1])];
				return  new Vector(crossP);
			}
		}
		this.parallelogramArea = function(otherVector) {
			return this.crossProduct(otherVector).magnitude();
		}
		this.triangleArea = function(otherVector) {
			return this.parallelogramArea(otherVector)/2;
		}
	}
}

module.exports = Vector;
// let p = new Vector([0,0,null]);
// console.log(p.coords);
// let r = new Vector([0,0,undefined]);
// console.log(r.coords);
// let s = new Vector([0,0,0]);
// console.log(s.coords);

