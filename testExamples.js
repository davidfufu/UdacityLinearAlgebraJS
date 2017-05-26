let Vector = require('./vector');
var Arith = require('./math');
var Line = require('./line');
var Plane = require('./plane');

/*MAGNITUDE AND UNIT VECTORS*/
// let v1 = new Vector([-0.221, 7.437]);
// let v2 = new Vector([8.813, -1.331, -6.247]);
// console.log(v1.magnitude());
// console.log(v2.magnitude());

// let v3 = new Vector([5.581,-2.136]);
// let v4 = new Vector([1.996, 3.108, -4.554]);
// console.log(v3.normalization().coords);
// console.log(v4.normalization().coords);

//  /*NORMALsIZATION TESTING========================*/
// let v1 = new Vector([0,0]);
// let v2 = new Vector([-1.996, 3.108, -4.554]);
// console.log(v2.normalization().coords);

// /*DOT VALUE AND INNER ANGLE TESTING ================*/
// let v1 = new Vector([7.887,4.138]);
// let v2 = new Vector([-8.802, 6.776]);
// console.log(Arith.round(v1.dotProduct(v2),3));

// let v3 = new Vector([-5.955, -4.904, -1.874]);
// let v4 = new Vector([-4.496, -8.755, 7.103]);
// console.log(Arith.round(v3.dotProduct(v4),3));

// let v6 = new Vector([3.183, -7.627]);
// let v7 = new Vector([-2.668, 5.319]);
// console.log(Arith.round(v6.angle(v7),5));

// let v8 = new Vector([7.35, 0.221, 5.188]);
// let v9 = new Vector([2.751, 8.259, 3.985]);
// console.log(Arith.round(v8.angle(v9, true),5));
// /*DOT VALUE AND INNER TESTING END=====================*/
// /*CHECKING IF PARALLEL TEST*/
// let v1 = new Vector([-7.579,-7.88]);
// let v2 = new Vector([22.737, 23.64]);
// console.log(v1.isParallelTo(v2));
// console.log(v1.isOrthogonalTo(v1));
// let v3 = new Vector([-2.029, 9.97, 4.172]);
// let v4 = new Vector([-9.231, -6.639, -7.245]);
// console.log(v3.isParallelTo(v4));
// console.log(v3.isOrthogonalTo(v4));
// let v5 = new Vector([-2.328, -7.284, -1.214]);
// let v6 = new Vector([-1.821, 1.072, -2.94]);
// console.log(v5.isParallelTo(v6));
// console.log(v5.isOrthogonalTo(v6));
// let v7 = new Vector([2.118, 4.827]);
// let v8 = new Vector([0,0]);
// console.log(v7.isParallelTo(v8));
// console.log(v7.isOrthogonalTo(v8));

// /*==============================================*/
// /*find the projection of vector [3.039,1.879] onto the basis vector [0.825,2.036]*/
// let v1 = new Vector([3.039,1.879]);
// let v2 = new Vector([0.825,2.036]);
// console.log(v1.parallelComponentTo(v2).coords);
// console.log(v1.orthogonalComponentTo(v2).coords);
// /*find the component of the vector [-9.88,-3.264,-8.159] orthogonal to the basis vector [-2.155,-9.353, -9.473]*/
// let v3 = new Vector([-9.88,-3.264,-8.159]);
// let v4 = new Vector([-2.155,-9.353, -9.473]);
// console.log(v3.orthogonalComponentTo(v4).coords);
// /*find the component vectors (2) of v [3.009, -6.172, 3.692, -2.51] one of which is parallel and one of which is orthogonal to [6.404, -9.144, 2.759, 8.718]*/
// let v5 = new Vector([3.009, -6.172, 3.692, -2.51]);
// let v6 = new Vector([6.404, -9.144, 2.759, 8.718]);
// console.log(v5.orthogonalComponentTo(v6).coords);

// /*====================================================*/
// /*CROSS PRODUCTS AND AREAS*/
// let v1 = new Vector([8.462,7.893,-8.187]);
// let v2 = new Vector([6.984, -5.975, 4.778]);
// console.log(v1.parallelComponentTo(v2).coords);
// console.log(v1.crossProduct(v2).coords);
// /*find the component of the vector [-9.88,-3.264,-8.159] orthogonal to the basis vector [-2.155,-9.353, -9.473]*/
// let v3 = new Vector([-8.987,-9.838,5.031]);
// let v4 = new Vector([-4.268,-1.861,-8.866]);
// console.log(v3.parallelogramArea(v4));
// let v5 = new Vector([1.5,9.547,3.691]);
// let v6 = new Vector([-6.007, 0.124, 5.772]);
// console.log(v5.triangleArea(v6));

// /*LINE EXERCISES*/

// let checkLine = function(l1,l2) {
// 	if (l1.isEqualTo(l2)) {
// 		console.log("The two lines are equal");
// 	}
// 	else if (l1.isParallelTo(l2)) {
// 		console.log("The two lines are parallel");
// 	}
// 	else {
// 		console.log("The intersection is ", l1.intersectionWith(l2));
// 	}

// }

// let line1 = new Line([4.046, 2.836], 1.21);
// let line2 = new Line([10.115, 7.09], 3.025);

// checkLine(line1,line2);


// let line3 = new Line([7.204, 3.182], 8.68);
// let line4 = new Line([8.172, 4.114], 9.883);

// checkLine(line3,line4);

// let line5 = new Line([1.182, 5.562], 6.744);
// let line6 = new Line([1.773, 8.343], 9.525);

// checkLine(line5,line6);


// /*PLANE TESTING==========================================================================*/

// let checkPlane = function(pa,pb) {
// 	if (pa.isEqualTo(pb)) {
// 		console.log('They were equal');
// 	}
// 	else if (pa.isParallelTo(pb)) {
// 		console.log("They are parallel");
// 	}
// 	else {
// 		console.log("They are not parallel");
// 	}
// }
// let p1 = new Plane([-0.412, 3.806, 0.728], -3.46);
// let p2 = new Plane([1.03, -9.515, -1.82], 8.65);
// checkPlane(p1,p2);
// let p3 = new Plane([2.611, 5.528, 0.283], 4.6);
// let p4 = new Plane([7.715, 8.306, 5.342], 3.76);
// checkPlane(p3,p4);
// let p5 = new Plane([-7.926, 8.625, -7.212], -7.952);
// let p6 = new Plane([-2.642, 2.875, -2.404], -2.443);
// checkPlane(p5,p6);

