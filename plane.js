let Vector = require('./vector');
let Decimal = require('./decimal');
let Arith = require('./math');
let Line = require('./line');

class Plane {
	constructor(normalVector=false, constantTerm=false) {
		this.firstNonZeroIndex = function(iterable) {
			for (let i = 0; i < iterable.length; i++) {
				let item = iterable[i];
				if (!Decimal.isNearZero(item)) {
					return i;
				}
			}
			console.log("No, non zero items found.");
			return null;
		}

		//initializing begin: if args are not given, we will make them over
		this.dimension = 3;

		this.initialize = function() {
			if (!normalVector) {
				let normalVector =[];
				for (let i = 0; i < this.dimension; i++){
					normalVector[i] = 0;
				}
			}
			this.normalVector = new Vector(normalVector);

			if (!constantTerm) {
				let constantTerm = 0;
			}
			this.constantTerm = constantTerm;

			this.set_basePoint();
		//basic initializing finished
		}

		this.set_basePoint = function() {
			try {
				let n = this.normalVector.coords;
				let c = this.constantTerm;
				//an empty array is being created for the basePoint. obviously it would be all zeros
				let basePointCoords = Array(this.dimension).fill(0);

				let initialIndex = this.firstNonZeroIndex(n);
				// console.log("initial index:", initialIndex);
				if (initialIndex == null) throw new Error("There weren't any non zero items in the array")

				let initialCoefficient = n[initialIndex];
				// console.log("initialCoefficient", initialCoefficient);
				basePointCoords[initialIndex] = c/initialCoefficient;
				// console.log("basepointcoords", basePointCoords);
				this.basePoint = new Vector(basePointCoords);
				}
			catch (e) {
				console.log(e.message);
				this.basePoint = null;
			}

		}


		let numDecimalPlaces = 3;

		function writeCoefficient(coefficient, isInitialTerm=false) {
			coefficient = Arith.round(coefficient, numDecimalPlaces);

			// coefficient % 1 == 0 ? coefficient = coefficient : ;

			let output = '';

            if (coefficient < 0) { output += "-";}
            if (coefficient > 0 && isInitialTerm == false) {output +="+";}
            if (isInitialTerm=false) {output += " ";}
            if (Math.abs(coefficient) != 1) {output += (Math.abs(coefficient)).toString();}
			return output;
		}

		//this is the main Plane equation writing function
		this.PlaneEquation = function() {
			let numDecimalPlaces = 3;
			let n = this.normalVector.coords;
			//this is where we begin writing. so we cycle through every item in the n vector coordinates and write out the coefficients

			let initialIndex = this.firstNonZeroIndex(n);
			let terms = [];
			for (let i = 0; i < this.dimension; i++)  {
				if (Arith.round(n[i], numDecimalPlaces) != 0) {
					let isInitialTerm = (i==initialIndex);
					terms.push(writeCoefficient(n[i], isInitialTerm) + 'x_'+ (i+1));
				}
			}
			let output = terms.join(' ');
			let constant = Arith.round(this.constantTerm, numDecimalPlaces);
			// (constant % 1 == 0) ? constant = constant;
			output += (" = " + constant);
			// console.log(output);
			return output;
		}

		this.isParallelTo = function(otherPlane) {
			return this.normalVector.isParallelTo(otherPlane.normalVector);
		}
		this.isEqualTo = function(otherPlane) {
			// if (Vector.isZero(this.normalVector)) {
			// 	if (!Vector.isZero(otherPlane.normalVector)){
			// 		return false;
			// 	} else {
			// 		diff = this.constantTerm - otherPlane.constantTerm;
			// 		return Decimal.isNearZero(diff);
			// 	}
			// }
			// else if (Vector.isZero(otherPlane.normalVector)) {
			// 	return false
			// }
			// if (!this.isParallelTo(otherPlane)) {return false}
			// let x0 = this.basePoint;
			// let y0 = otherPlane.basePoint;
			// console.log("xo: ", x0.coords, "y0", y0.coords);
			// let basePointDifference = x0.subtract(y0);
			// console.log(basePointDifference.coords);

			// let n = this.normalVector;
			// return basePointDifference.isOrthogonalTo(n);
			return (this.normalVector.isEqualTo(otherPlane.normalVector)) && (Math.abs(this.constantTerm.subtract(otherPlane.constantTerm)) < 1e-10);
		}

		this.intersectionWith = function(otherPlane) {
				let snv = this.normalVector.coords;
				let onv = otherPlane.normalVector.coords;
				let a = snv[0];
				let b = snv[1];
				let c = onv[0];
				let d = onv[1];

				let k1 = this.constantTerm;
				let k2 = otherPlane.constantTerm;

				let xNumerator = d*k1 - b*k2;
				let yNumerator = c*-1*k1 + a*k2;
				let oneOverDenom = 1/(a*d-b*c);
				let intersection = new Vector([xNumerator, yNumerator]);
				return intersection.scalarM(oneOverDenom).coords;
		}
		//initialize basic properties using the given args
		this.initialize();
		//set the base point
		this.set_basePoint();
		//print the equation of the Plane
		this.PlaneEquation();
	}
}

module.exports = Plane;