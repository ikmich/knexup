// import { _fn } from '../utils/index.js';
//
// const userTable = {
//   columns: ['id', 'firstname', 'lastname', 'email', 'phone', 'active', 'creator_id']
// };
//
// type SchemaDef<T> = {}
// type Cols = string | string[]
//
// function schemaDef<T>(table: string, columns: string[]) {
//   const cols = [...columns] as const;
//   const T1 = (typeof cols)[number];
//
//   const colMap = _fn(() => {
//     const ob: Record<string, string> = {};
//     for (let col of columns) {
//       ob[col] = col;
//     }
//     return ob;
//   });
//
//   type TT = typeof  columns;
//
//   const c:TT = {
//
//   }
//
// }
//
//  schemaDef('user', ['id', 'firstname', 'lastname']);
