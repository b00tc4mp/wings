/**
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

		rotX : function(ang) {
			Tri.rotX(ang, this);
		},

		rotY : function(ang) {
			Tri.rotY(ang, this);
		},

		rotZ : function(ang) {
			Tri.rotZ(ang, this);
		},

		transX : function(dis) {
			Tri.transX(dis, this);
		},

		transY : function(dis) {
			Tri.transY(dis, this);
		},

		transZ : function(dis) {
			Tri.transZ(dis, this);
		}

	};

	Tri._rad = function(deg) {
		return Math.PI * deg / 180;
	};

	Tri._rot = function(ang) {
		return {
			sin : Math.sin(Tri._rad(ang)),
			cos : Math.cos(Tri._rad(ang))
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

	Tri.rotX = function(ang, p) {
		Tri._rotX(Tri._rot(ang), p);
	};

	Tri.rotY = function(ang, p) {
		Tri._rotY(Tri._rot(ang), p);
	};

	Tri.rotZ = function(ang, p) {
		Tri._rotZ(Tri._rot(ang), p);
	};

	Tri.transX = function(dis, p) {
		p.x += dis;
	};

	Tri.transY = function(dis, p) {
		p.y += dis;
	};

	Tri.transZ = function(dis, p) {
		p.z += dis;
	};

	Tri.trans = function(dx, dy, dz, p) {
		Tri.transX(dx, p);
		Tri.transY(dy, p);
		Tri.transZ(dz, p);
	};

	// arrays

	Tri.rotArrayX = function(ang, arr) {
		var rot = Tri._rot(ang);
		for ( var i in arr)
			Tri._rotX(rot, arr[i]);
	};

	Tri.rotArrayY = function(ang, arr) {
		var rot = Tri._rot(ang);
		for ( var i in arr)
			Tri._rotY(rot, arr[i]);
	};

	Tri.rotArrayZ = function(ang, arr) {
		var rot = Tri._rot(ang);
		for ( var i in arr)
			Tri._rotZ(rot, arr[i]);
	};

	Tri.transArrayX = function(dis, arr) {
		for ( var i in arr)
			Tri.transX(dis, arr[i]);
	};

	Tri.transArrayY = function(dis, arr) {
		for ( var i in arr)
			Tri.transY(dis, arr[i]);
	};

	Tri.transArrayZ = function(dis, arr) {
		for ( var i in arr)
			Tri.transZ(dis, arr[i]);
	};

	Tri.transArray = function(dx, dy, dz, arr) {
		for ( var i in arr)
			Tri.trans(dx, dy, dz, arr[i]);
	};

})();