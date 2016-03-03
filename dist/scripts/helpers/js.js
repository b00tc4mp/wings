/**
 * Just J(ava)S(cript).
 * 
 * @author manuelbarzi
 */
var js;
(function() {
	'use strict';

	js = {

		// existence

		is : function(obj) {
			return !!obj;
		},

		not : function(obj) {
			return !obj;
		},

		isDefined : function(obj) {
			return obj !== undefined;
		},

		notDefined : function(obj) {
			return obj === undefined;
		},

		// objects

		isObject : function(obj) {
			return typeof obj === 'object';
		},

		typeOf : function(obj) {
			return this.isFunction(obj) ? obj.name || Function.name
					: obj.constructor.name || Object.name;
		},

		isType : function(obj, type) {
			return obj instanceof type;
		},

		isTypeFrom : function(type, typeFrom) {
			return this.isType(type.prototype, typeFrom);
		},

		// object properties

		get : function(object, path) {
			if (typeof path === 'string') {
				path = path.split('.');
			}
			var length = path.length, value = object;
			for (var i = 0; i < length; i++) {
				if (value) {
					value = value[path[i]];
				} else {
					break;
				}
			}
			return value;
		},

		put : function(object, path, value) {
			if (typeof path === 'string') {
				path = path.split('.');
			}
			var length = path.length, tmp = object;
			for (var i = 0; i < length; i++) {
				if (i < length - 1) {
					if (!tmp[path[i]]) {
						tmp[path[i]] = {};
					}
					tmp = tmp[path[i]];
				} else {
					tmp[path[i]] = value;
				}
			}
			return value;
		},

		pull : function(object, path) {
			if (typeof path === 'string') {
				path = path.split('.');
			}
			var length = path.length, tmp = object, value;
			for (var i = 0; i < length; i++) {
				value = tmp[path[i]];
				if (!value) {
					break;
				} else if (i === length - 1) {
					tmp[path[i]] = undefined;
				} else {
					tmp = value;
				}
			}
			return value;
		},

		merge : function(from, to) {
			var fromValue, toValue;
			for ( var fromKey in from) {
				toValue = to[fromKey];
				if (toValue) {
					fromValue = from[fromKey];
					if (toValue !== fromValue) {
						if (typeof toValue === 'string'
								|| typeof fromValue === 'string') {
							to[fromKey] = fromValue;
						} else {
							this.merge(toValue, fromValue);
						}
					}
				} else {
					to[fromKey] = from[fromKey];
				}
			}
			return to;
		},

		fuse : function(from, to) {
			for ( var fromKey in from) {
				to[fromKey] = from[fromKey];
			}
			for ( var toKey in to) {
				to[toKey] = from[toKey];
			}
		},

		// objects comparison

		matchPropertyValues : function(obj1, obj2, propertyRelationMap) {
			for ( var prop1 in propertyRelationMap) {
				var prop2 = propertyRelationMap[prop1];
				if (obj1[prop1] !== obj2[prop2])
					return false;
			}
			return true;
		},

		// arrays

		isArray : function(object) {
			return Object.prototype.toString.call(object) === '[object Array]';
		},

		empty : function(arr) {
			return arr.length === 0;
		},

		notEmpty : function(arr) {
			return arr.length !== 0;
		},

		addIfNotExisting : function(arr, value) {

			var length = arr.length;
			if (length === 0) {
				arr.push(value);
			} else {
				for (var i = 0; i < length; i++) {
					if (arr[i] === value) {
						break;
					} else if (i === length - 1) {
						arr.push(value);
					}
				}
			}
			return arr;
		},

		getByProperty : function(arr, property, value) {
			var length = arr.length, obj;
			for (var i = 0; i < length; i++) {
				obj = arr[i];
				if (obj[property] === value) {
					break;
				} else if (i === length - 1) {
					obj = undefined;
				}
			}
			return obj;
		},

		// functions

		/**
		 * Checks whether the object is a function.
		 */

		isFunction : function(obj) {
			return typeof obj === 'function';
		},

		/**
		 * extracts function's argument names
		 */
		argNames : function(func) {
			var fnStr = func.toString().replace(
					/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, ''); // strip
			// comments
			var result = fnStr
					.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(
							/([^\s,]+)/g); // argument names
			if (result === null)
				result = [];
			return result;
		},

		/**
		 * extracts function's argument pairs (name-value)
		 */
		args : function(func, args) {
			var names = this.argNames(func), argums = {};
			for (var i = 0; i < names.length; i++) {
				argums[names[i]] = args[i];
			}
			return argums;
		},

		// dom about

		/**
		 * safety Run when DOM loaded.
		 */
		run : function(func) {
			if (js.not(js.run._waiting))
				js.run._waiting = [];
			if (js.isFunction(func))
				js.run._waiting.push(func);
			if (js.not(js.run._firstCalled)) {
				window.addEventListener('load', js.run);
				return js.run._firstCalled = true;
			}
			if (js.not(document.body))
				return setTimeout(js.run, 1);
			if (js.not(js.run._running)) {
				js.run._running = js.run._waiting;
				js.run._waiting = [];
				for ( var i in js.run._running)
					js.run._running[i]();
				js.run._running = undefined;
				if (js.notEmpty(js.run._waiting))
					js.run();
			}
		}

	};
})();
