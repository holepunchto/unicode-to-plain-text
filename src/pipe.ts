/** Generic function type for pipeline operations */
type PipeFn<T, U> = (input: T) => U

/**
 * Functional composition utility for pipeline operations.
 * Provides type-safe function composition with proper type inference across the entire chain.
 */
export function pipe<A>(fn1: PipeFn<A, A>): PipeFn<A, A>
export function pipe<A, B>(fn1: PipeFn<A, B>): PipeFn<A, B>
export function pipe<A, B, C>(fn1: PipeFn<A, B>, fn2: PipeFn<B, C>): PipeFn<A, C>
export function pipe<A, B, C, D>(
  fn1: PipeFn<A, B>,
  fn2: PipeFn<B, C>,
  fn3: PipeFn<C, D>
): PipeFn<A, D>
export function pipe<A, B, C, D, E>(
  fn1: PipeFn<A, B>,
  fn2: PipeFn<B, C>,
  fn3: PipeFn<C, D>,
  fn4: PipeFn<D, E>
): PipeFn<A, E>
export function pipe<A, B, C, D, E, F>(
  fn1: PipeFn<A, B>,
  fn2: PipeFn<B, C>,
  fn3: PipeFn<C, D>,
  fn4: PipeFn<D, E>,
  fn5: PipeFn<E, F>
): PipeFn<A, F>
export function pipe<A, B, C, D, E, F, G>(
  fn1: PipeFn<A, B>,
  fn2: PipeFn<B, C>,
  fn3: PipeFn<C, D>,
  fn4: PipeFn<D, E>,
  fn5: PipeFn<E, F>,
  fn6: PipeFn<F, G>
): PipeFn<A, G>
export function pipe<A, B, C, D, E, F, G, H>(
  fn1: PipeFn<A, B>,
  fn2: PipeFn<B, C>,
  fn3: PipeFn<C, D>,
  fn4: PipeFn<D, E>,
  fn5: PipeFn<E, F>,
  fn6: PipeFn<F, G>,
  fn7: PipeFn<G, H>
): PipeFn<A, H>
export function pipe<A, B, C, D, E, F, G, H, I>(
  fn1: PipeFn<A, B>,
  fn2: PipeFn<B, C>,
  fn3: PipeFn<C, D>,
  fn4: PipeFn<D, E>,
  fn5: PipeFn<E, F>,
  fn6: PipeFn<F, G>,
  fn7: PipeFn<G, H>,
  fn8: PipeFn<H, I>
): PipeFn<A, I>
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  fn1: PipeFn<A, B>,
  fn2: PipeFn<B, C>,
  fn3: PipeFn<C, D>,
  fn4: PipeFn<D, E>,
  fn5: PipeFn<E, F>,
  fn6: PipeFn<F, G>,
  fn7: PipeFn<G, H>,
  fn8: PipeFn<H, I>,
  fn9: PipeFn<I, J>
): PipeFn<A, J>
export function pipe(...fns: Array<PipeFn<any, any>>): PipeFn<any, any> {
  return (input: any): any => fns.reduce((acc, fn) => fn(acc), input)
}
