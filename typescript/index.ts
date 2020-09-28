let a: number = 1;
// number, string, boolean, undefined, null, array, object, function

console.log(add(a, 5));

function add(x: number, y: number): number {
  return x + y;
}

const tomb: number[] = [1, 2, 3];
const objektum = {
  valami: true,
  subtract: (a: number, b: number) => { return a - b; },
  setValami (ujValami) {
    this.valami = ujValami;
  },
};

console.log(objektum.valami);
objektum.setValami(false);
console.log(objektum.valami);
console.log(objektum.subtract(5, 1));

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
}

const user1 = {
  id: 1,
  name: 'Tibor',
  username: 'tibor',
  password: 'cica',
} as User;

abstract class Shape {
  abstract getArea(): number;
}

class Circle extends Shape {

  constructor(private _radius: number) {
    super();
  }

  get radius() {
    return this._radius;
  }

  set radius(newRadius: number) {
    if (newRadius < 0) {
      throw Error('negativ sugar');
    }
    this._radius = newRadius;
  }

  getArea(): number {
    return this._radius * this._radius * Math.PI;
  }

  getCircumference(): number {
    return 2 * this._radius * Math.PI;
  }
}

const c1: Circle = new Circle(1);
c1.getArea();
// (c1 as Circle).getCircumference();

c1.radius = 5;
console.log(c1.radius);



