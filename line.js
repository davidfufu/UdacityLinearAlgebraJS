let Vector = require('./vector');
let Arith = require('./math');

class Line {
	constructor(normalVector=false, constantTerm=false) {
		this.firstNonZeroIndex = function(iterable) {
			for (let i = 0; i < iterable.length; i++) {
				let item = iterable[i];
				if (!Arith.isNearZero(item)) {
					return i;
				}
			}
			console.log("No, non zero items found.");
			return null;
		}

		//initializing begin: if args are not given, we will make them over
		this.dimension = 2;

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
		//basic initializing finished
		}

		this.set_basePoint = function() {
			try {
				let n = this.normalVector.coords;
				let c = this.constantTerm;
				//an empty array is being created for the basePoint. obviously it would be all zeros
				let basePointCoords = Array(this.dimension).fill(0);

				let initialIndex = this.firstNonZeroIndex(n);
				if (initialIndex == null) throw new Error("There weren't any non zero items in the array")

					let initialCoefficient = n[initialIndex];
				basePointCoords[initialIndex] = c/initialCoefficient;

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

		output = coefficient < 0 ? output += '-' : output;
		output = (coefficient > 0 && !isInitialTerm) ? output += "+": output = output;
		output = !isInitialTerm ? output += " " : output;

		output = (Math.abs(coefficient) != 1) ? output += (coefficient.toString()) : output;

		return output;
		}

		//this is the main line equation writing function
		this.lineEquation = function() {
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
			console.log(output);
			return output;
		}

		this.isParallelTo = function(otherLine) {
			return this.normalVector.isParallelTo(otherLine.normalVector);
		}
		this.isEqualTo = function(otherLine) {
			if (Vector.isZero(this.normalVector)) {
				if (!Vector.isZero(otherLine.normalVector)){
					return false;
				} else {
					diff = this.constantTerm - otherLine.constantTerm;
					return Decimal.isNearZero(diff);
				}
			}
			else if (Vector.isZero(otherLine.normalVector)) {
				return false
			}
			if (!this.isParallelTo(otherLine)) {return false}
			let x0 = this.basePoint;
			let y0 = otherLine.basePoint;
			let basePointDifference = x0.subtract(y0);

			let n = this.normalVector;
			return basePointDifference.isOrthogonalTo(n);
		}

		this.intersectionWith = function(otherLine) {
				let snv = this.normalVector.coords;
				let onv = otherLine.normalVector.coords;
				let a = snv[0];
				let b = snv[1];
				let c = onv[0];
				let d = onv[1];

				let k1 = this.constantTerm;
				let k2 = otherLine.constantTerm;

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
		//print the equation of the line
		this.lineEquation();
	}
}

module.exports = Line;