## Primeros ejemplos de typescript sin escribir tipos

Importante TypeScript funciona solo en la compilación pero en tiempo de ejecución es JavaScript.
No ahorra codigo.

```ts
const a = 1;
const b = 2;

const c = a + b;
```

Ahora un objeto

```ts
const obj = {
  name: "Pepe",
  age: 30,
};

obj.name = 10; // Error
```

## Los tipos básicos de Typescript

- number
- string
- boolean
- null
- undefined
- symbol
- bigint

## La inferencia de tipos

```ts
n = 2; // infiere que es un número
b = "Hola"; // infiere que es string
```

## Tipos especiales: any

any es un tipo especial que simplemente no tiene tipo. Lo que significa que puede ser cualquier cosa.
Basicamente desactiva el type-checking.

```ts
let obj: any = { x: 0 };

obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

Si typescript no puede inferir el tipo del contexto, el compilador usará any por defecto

## Funciones

### Tipando arrow functions:

### Funciones que no devuelven nada `void`:

```ts
const logError = (errorMessage: string) => {
  console.error(`ERROR: ${errorMessage}`);
};
```

### `never`, cuando nunca debe devolver nada

```ts
function throwError(mensaje: string):never {
    if(mensaje) {
        throw ner Error(mensaje);
    }

    throw new Error('Error general')
}

function procesarResultado(resultado: number | string): void {
    if(typeof resultado === "number") {
        console.log("El resultado es: " + resultado)
    } else if (typeof resultado === "string") {
        console.log("El resultado es una cadena: " + resultado)
    } else {
        console.log("No es válido")
    }
}
```

## Funciones anónimas

### La inferencia de tipos no siempre funciona con los parámetros

```ts
function suma(a, b) {
  //detecta como tipo any a y b
  return a + b;
}

suma(2, 2);
```

## Objeto

```ts
//inferencia

let hero = {
  name: "thor",
  age: 1500,
};
```

Intentamos acceder o modificar propiedades que no existen o con otros tipos

```ts
// ninguna de estas es válida
hero.name = 10;
hero.age = "hola";
hero.power = 100;
```

Escribimos una función para crear héroes:

```ts
function createHero(name: string, age: number): { name: string; age: number } {
  return {
    name,
    age,
  };
}
```

### Alias type

```ts
type Hero = {
  name: string;
  age: number;
};

function createHero(hero: Hero): Hero {
  const { name, age } = hero;

  return {
    name,
    age,
  };
}
```

## Opcional properties

Añadimos `isActive` y nos da problemas porque debe ser opcional:

```ts
type Hero = {
  name: string;
  age: number;
  isActive?: boolean;
};

function createHero(hero: Hero): Hero {
  const { name, age } = hero;

  return {
    name,
    age,
    isActive: true,
  };
}
```

### readonly con la id

```ts
type Hero = {
  readonly id: number;
  name: string;
  age: number;
  isActive?: boolean;
};

function createHero(hero: Hero): Hero {
  const { name, age, id } = hero;

  return {
    id,
    name,
    age,
    isActive: true,
  };
}
```

Obligar a que sea de tipo string-string-string-string-string

```ts
type Hero = {
  readonly id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  age: number;
  isActive?: boolean;
};

function createHero(hero: Hero): Hero {
  const { name, age } = hero;

  return {
    id: crypto.randomUUID(),
    name,
    age,
    isActive: true,
  };
}
```

##Union types

```ts
type HeroId = `${string}-${string}-${string}-${string}-${string}`;
type PowerScale = "local" | "planetary" | "cosmic";

type Hero = {
  readonly id: HeroId;
  name: string;
  age: number;
  isActive?: boolean;
  powerScale?: PowerScale;
};

function createHero(hero: Hero): Hero {
  const { name, age } = hero;

  return {
    id: crypto.randomUUID(),
    name,
    age,
    isActive: true,
  };
}
```

## Type Indexing

```ts
type HeroProperties = {
    isActive?: boolean,
    address?: {
        planet string,
        city: string
    }
}

const address: HeroProperties["address"] = {
    planet: 'Tierra',
    city: 'Chile'
}
```

## Type from Values

```ts
type Address = typeod address
```

## Arrays

```ts
const languages = [];

languages.push("hola");
languejes.push(2);
languejes.push(true);
```

Con string

```ts
const languages: string[] = [];

languages.push("hola");
languejes.push(2); // X
languejes.push(true); // X
```

## Tuplas

```ts
type values = "X" | "O" | "";
type arrayValues = [
  [values, values, values],
  [values, values, values],
  [values, values, values]
];

const board: arrayValues = [
  ["X", "", ""],
  ["", "", "X"],
  ["", "X", ""],
];
```

## Enums

En javascript es algo así:

```js
const ERROR_TYPES = {
  NOT_FOUND: "notFound",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
};

function mostrarMensaje(tipoDeError) {
  if (tipoDeError == ERROR_TYPES.NOT_FOUND) {
    console.log("No se encuentra el recurso");
  } else if (tipoDeError == ERROR_TYPES.UNAUTHORIZED) {
    console.log("No tienes permisos para acceder");
  } else if (tipoDeError == ERROR_TYPES.FORBIDDEN) {
    console.log("No tienes permisos para acceder");
  }
}
```

En typescripts usamos Enums:

```ts
//Idealmente utilizar const enum dado que es menos codigo en el js, pero si van a consumir hacia afuera idealmente sin const
const enum ERROR_TYPES {
  NOT_FOUND, // 0 o como se utilice en la bd = 'notfound'
  UNAUTHORIZED, // 1
  FORBIDDEN, // 3
}

function mostrarMensaje(tipoDeError: ERROR_TYPES) {
  if (tipoDeError == ERROR_TYPES.NOT_FOUND) {
    console.log("No se encuentra el recurso");
  } else if (tipoDeError == ERROR_TYPES.UNAUTHORIZED) {
    console.log("No tienes permisos para acceder");
  } else if (tipoDeError == ERROR_TYPES.FORBIDDEN) {
    console.log("No tienes permisos para acceder");
  }
}
```

## Aserciones de tipos

```ts
// Este puede petar
const canvas2 = document.getElementById("canvas") as HTMLCanvasElement;

// null si no lo encuentra
// HTMLElement si lo encuentra

if (canvas2 != null) {
  const ctx = canvas2.getContext("2d");
}

//Este no peta
const canvas = document.getElementById("canvas");

if (canvas instanceof HTMLCanvasElement) {
  // deduciendo que es un canvas HTML
  // JavaScript está ejecutando el código de condición
  const ctx = canvas.getContext("2d");
}
```

## Fetching

```ts
// Ir a QuickType para transformar la respuesta
const API_URL = "https://api.github.com/search/repositories?q=javascript";

const response = await fetch(API_URL);

if (!response.ok) {
  throw new Error("Request failed");
}

const data = (await response.json()) as GitHubAPIResponse;
//Gracias a esto ahora se pueden ver los tipos sin equivocarse (QuickType -> TypeScript con ZOD valida los tipos de los datos)
data.items.map((repo) => {
  return {
    name: repo.name, //Auque Typescript diga que esta bien pueden mandarte otros datos
    id: repo.id,
  };
});
```

## Interfaces

Sabemos la forma pero no nos dice como es el objeto en sí

```ts
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  quantity: number;
}

interface Zapatilla extends Producto {
  talla: number;
  color: string;
}

interface CarritoDeCompras {
  totalPrice: number;
  productos: (Producto | Zapatilla)[];
}

interface CarriptoOps {
  add: (product: Producto) => void;
  remove: (product: Producto) => void;
  update: (product: Producto) => void;
  clear: () => void;
}

const carrito: CarritoDeCompras = {
  totalPrice: 100,
  productos: [
    {
      id: 1,
      nombre: "Producto 1",
      precio: 100,
      descripcion: "Descripcion del producto 1",
      imagen: "imagen del producto 1",
      quantity: 1,
    },
  ],
};
```

Algo que se puede hacer y con los types no es que se puede repetir mas de una vez la misma interfaz

```ts
interface CarriptoOps {
  add: (product: Producto) => void;
  remove: (product: Producto) => void;
  update: (product: Producto) => void;
}

interface CarriptoOps {
  clear: () => void;
}
```

## Narrowing

Basico, mas que nada asegurarse del tipo de dato que se usará

```ts
function mostrarLongitud(objeto: number | string) {
  if (typeof objeto === "string") {
    return objeto.length;
  }
  return objeto.toString().length;
}

mostrarLongitud("1");
```

En interfaces

```ts
interface Mario {
  company: "nintendo"; // o 'nintendo'
  nombre: string;
  saltar: () => void;
}

interface Sonic {
  company: "Sega";
  nombre: string;
  correr: () => void;
}

type Personaje = Mario | Sonic;
```

```ts
// Con compañia
function jugar(personaje: Personaje) {
  if (personaje.company === "nintendo") {
    personaje.saltar();
    return;
  }
  console.log(personaje.correr());
  return;
}
```

```ts
// type Guard
function checkIsSonic(personaje: Personaje): personaje is Sonic {
  return (personaje as Sonic).correr !== undefined;
}

function jugar(personaje: Personaje) {
  if (checkIsSonic(personaje)) {
    personaje.correr();
    return;
  }
  personaje.saltar();
  return;
}
```

## Tipo Never

```ts
function fn(x: string | number) {
  if (typeof x === "number") {
    x.toFixed(2);
  } else if (typeof x === "string") {
    x.toLocaleUpperCase();
  } else {
    x; // never
  }
}
```

## Instance of class

```ts
class Avenger {
  name: string;
  private powerScore: number; // public por defecto, protected es privado pero solo acceden clases que heredan
  wonBattles: number = 0;

  constructor(name: string, powerScore: number) {
    this.name = name;
    this.powerScore = powerScore;
  }

  get fullName(): string {
    return this.name;
  }

  set power(newPower: number) {
    if (newPower <= 100) {
      this.powerScore = newPower;
    } else {
      throw new Error("Power score cannot be greater than 100");
    }
  }
}

const avengers = new Avenger("Iron Man", 100);
avengers.name = "Hulk"; // No tiene Sentido
```

### Interfaces en clases

```ts
interface Avenger {
  name: string;
  powerScore: number;
  wonBattle: number;
  age: number;
}

class Avenger implements Avenger {
  constructor(name: string, powerScore: number) {
    this.name = name;
    this.powerScore = powerScore;
  }
}
```
