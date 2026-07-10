---
share_link: https://share.note.sx/6pw2d7lf#R0oOUs93rAFhuxgQsB+JngBtGfKHPTzQVr021D1iKPk
share_updated: 2025-04-12T09:07:00+02:00
---
2025-04-08 21:24
Tags: #system-design
##### Content
### Single Responsibility
Each class should have only **one** sole purpose,
and not be filled with excessive functionality.

Example:
```ts
class AreaCalculator {
	public sum(): number;
	
	// This breaks the rule, calculator should only calculate
	public json(): string;
	public csv(): string;
}

// Solution is to extract this functionality to another class
class ShapesPrinter {
	public json(): string;
	public csv(): string;
}
```

### Open Closed
Classes should be open for extension,
but closed for modification.

In other words, you should not have to modify an existing class for implementing new functionality.

Example:
```ts
class Square {
	side: number
}

class Circle {
	radius: number
}

class AreaCalculator {
	// The problem here is that if we added new shapes,
	// we need to modify this method which breaks the rule
	public sum(shapes: object[]): number {
		for (const shape of shapes) {
			if (shape instanceof Square) {
				...
			} else if (shape instanceof Circle) {
				...
			}
		}
	}
}

// Instead, we define a common interface for all shapes
// that can be used directly in AreaCalculator
interface Shape {
	area(): number;
}

class Square implements Shape {
	side: number
	public area() {}
}

class Circle implements Shape {
	radius: number
	public area() {}
}

class AreaCalculator {
	public sum(shapes: Shape[]): number {
		for (const shape of shapes) {
			sum += shape.area();
		}
	}
}
```

### Liskov Substitution
Every subclass or derived class should be **substitutable**
for their base or parent class.

Example:
```ts
interface Shape {
	area(): number
}

// This breaks the rule because the derived class
// cannot be used where its parent is used (throws an error)
class NoShape implements Shape {
	area() {
		throw new Error()
	}
}
```

### Interface Segregation
Interfaces should not force classes to implement
what they can't do.
Large interfaces should be divided into small ones.

Example:
```ts
interface Shape {
	area(): number
	volume(): number
}

class Cube implements Shape {
	area() {}
	volume() {}
}

class Circle implements Shape {
	area() {}
	// This here breaks the rule
	// because a circle (2d shape)
	// cannot have a volume
	volume() {}
}

// Instead, we extract 3d functionality to its own interface
interface ThreeDiemsionalShape {
	volume(): number
}

interface Shape {
	area(): number
}

// And use it only with appropiete classes
class Cube implements Shape, ThreeDimensionalShape {
	area() {}
	volume() {}
}

class Circle implements Shape {
	area() {}
}
```

### Dependency Inversion
Components should depend on abstractions,
not on concretions.

Example:
```ts
class AreaCalculator() {
	sum() {}
}

class ShapePrinter {
	// Here ShapePrinter depends directly on
	// the implemented class AreaCalculator
	// which breaks the rule
	private areaCalculator = new AreaCalculator()
	
	print() {
		return `${areaCalculator.sum()}`
	}
}

// Instead, we could create an interface
// for AreaCalculator and use this inside ShapePrinter
interface IAreaCalculator {
	sum(): number
}

class AreaCalculator implements IAreaCalculator {
	sum() {}
}

class ShapePrinter {
	areaCalculator: IAreaCalculator
	
	// Now we use the abstraction interface
	// so this should work with any class
	// that implements this interface
	constructor(areaCalculator: IAreaCalculator) {
		this.areaCalculator = areaCalculator
	}
	
	print() {
		return `${areaCalculator.sum()}`
	}
}
```

##### References
https://www.youtube.com/watch?v=_jDNAf3CzeY