// function SuperType() {}
// function SubType() {}
// SubType.prototype = new SuperType()

// function SuperType() { }

// function SubType() {
//   SuperType.call(this);
// }

// function SuperType() {
//   this.name = name
// }
// SuperType.prototype.sayName = function() { }

// function SubType() {
//   SuperType.call(this, name)
//   this.age = age;
// }

// SubType.prototype = new SuperType()
// SubType.prototype.constructor = SubType;

function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype)
  prototype.constructor = subType;
  subType.prototype = prototype
}

function SuperType(name) {
  this.name = name;
}
SuperType.prototype.say = function() {}

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.age = function() {}