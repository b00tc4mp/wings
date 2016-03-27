/*!
 * TriJS.
 * 
 * JavaScript library that provides 3D operations.
 * 
 * @author manuelbarzi
 */
var Tri;
(function() {

	Tri = {};

	Tri.Point = function Point(x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	};

	Tri.Point.prototype = {

		toString : function() {
			return JSON.stringify(this);
		},

		rotX : function(deg) {
			Tri.rotX(deg, this);
		},

		rotY : function(deg) {
			Tri.rotY(deg, this);
		},

		rotZ : function(deg) {
			Tri.rotZ(deg, this);
		},

		transX : function(dx) {
			Tri.transX(dx, this);
		},

		transY : function(dy) {
			Tri.transY(dy, this);
		},

		transZ : function(dz) {
			Tri.transZ(dz, this);
		}

	};

	Tri._rad = function(deg) {
		return Math.PI * deg / 180;
	};

	Tri._rot = function(deg) {
		return {
			sin : Math.sin(Tri._rad(deg)),
			cos : Math.cos(Tri._rad(deg))
		};
	};

	Tri._rotX = function(r, p) {
		var y = p.y, z = p.z;
		p.y = y * r.cos - z * r.sin;
		p.z = y * r.sin + z * r.cos;
	};

	Tri._rotY = function(r, p) {
		var x = p.x, z = p.z;
		p.x = x * r.cos + z * r.sin;
		p.z = -x * r.sin + z * r.cos;
	};

	Tri._rotZ = function(r, p) {
		var x = p.x, y = p.y;
		p.x = x * r.cos - y * r.sin;
		p.y = x * r.sin + y * r.cos;
	};

	Tri.rotX = function(deg, p) {
		Tri._rotX(Tri._rot(deg), p);
	};

	Tri.rotY = function(deg, p) {
		Tri._rotY(Tri._rot(deg), p);
	};

	Tri.rotZ = function(deg, p) {
		Tri._rotZ(Tri._rot(deg), p);
	};

	Tri.transX = function(dx, p) {
		p.x += dx;
	};

	Tri.transY = function(dy, p) {
		p.y += dy;
	};

	Tri.transZ = function(dz, p) {
		p.z += dz;
	};

	Tri.trans = function(dx, dy, dz, p) {
		Tri.transX(dx, p);
		Tri.transY(dy, p);
		Tri.transZ(dz, p);
	};

	// arrays

	Tri.rotArrayX = function(deg, arr) {
		var rot = Tri._rot(deg);
		for ( var i in arr)
			Tri._rotX(rot, arr[i]);
	};

	Tri.rotArrayY = function(deg, arr) {
		var rot = Tri._rot(deg);
		for ( var i in arr)
			Tri._rotY(rot, arr[i]);
	};

	Tri.rotArrayZ = function(deg, arr) {
		var rot = Tri._rot(deg);
		for ( var i in arr)
			Tri._rotZ(rot, arr[i]);
	};

	Tri.transArrayX = function(dx, arr) {
		for ( var i in arr)
			Tri.transX(dx, arr[i]);
	};

	Tri.transArrayY = function(dy, arr) {
		for ( var i in arr)
			Tri.transY(dy, arr[i]);
	};

	Tri.transArrayZ = function(dz, arr) {
		for ( var i in arr)
			Tri.transZ(dz, arr[i]);
	};

	Tri.transArray = function(dx, dy, dz, arr) {
		for ( var i in arr)
			Tri.trans(dx, dy, dz, arr[i]);
	};

})();