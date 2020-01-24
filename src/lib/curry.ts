const curry = <T0, Ts extends unknown[], U>(f: (x: T0, ...xs: Ts) => U) => (x: T0) => (...xs: Ts): U => f(x, ...xs)

export default curry
