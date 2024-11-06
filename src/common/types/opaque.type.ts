declare const typeID: unique symbol;
/**
 * Allows pseudo-nominal typing in TypeScript (which uses structural typing).
 * For example, Opaque<string, "EmployeeID">
 *
 * See https://evertpot.com/opaque-ts-types/ for detailed explanation.
 */
export type Opaque<T, Identifier extends string> = T & {
  [typeID]: Identifier;
};
