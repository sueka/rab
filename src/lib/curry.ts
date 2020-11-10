type CurryFunction = <T0, Ts extends unknown[], U>(f: (x: T0, ...xs: Ts) => U) => (x: T0) => (...xs: Ts) => U

const curry: CurryFunction = (f) => (x) => (...xs) => f(x, ...xs)

export default curry
