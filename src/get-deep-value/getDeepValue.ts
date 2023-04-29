/**
 * @description Get the value of a deep object with two keys
 * @param obj The object to get the value from
 * @param firstKey The parameter to get the first key from
 * @param secondKey The parameter to get the second key from
 * @returns The value of the merged object from the first and second key
 * @example
  const deepObject = {
    name: {
      firstName: 'Serif',
      lastName: 'Colakel',
      identifier: '1234567890',
    },
    age: {
      birth: 'YYYY-MM-DD',
      death: 'YYYY-MM-DD',
    }
  }
 * const deepValue = getDeepValue(deepObject, 'name', 'firstName');
 * console.log(deepValue) // Serif
 * 
 * const deepValue = getDeepValue(deepObject, 'name',  'lastName');
 * console.log(deepValue) // Colakel
 * 
 * const deepValue = getDeepValue(deepObject, 'name', 'identifier');
 * console.log(deepValue) // 1234567890
 * 
 * @description Get the value of a deep object with three keys with recursion
 * @example
  const deepObject = {
    name: {
      firstName: 'Serif',
      lastName: 'Colakel',
      identifier: {
        id: '1234567890',
        type: 'SSN',
        state: {
          id: '1',
          abbreviation: 'CA',
          label: 'California',
          gender: 'M',
      },
    },
    age: {
      birth: 'YYYY-MM-DD',
      death: 'YYYY-MM-DD',
    }
  }
 * const deepValue = getDeepValue(deepObject, 'name');
 * const deepValueRes = getDeepValue(getDeepValue(deepValue), 'identifier', 'id');
 * console.log(deepValueRes) // 1234567890
 *  
 * const deepValue = getDeepValue(deepObject, 'name');
 * const deepValueRes = getDeepValue(getDeepValue(deepValue), 'identifier', 'type');
 * console.log(deepValueRes) // SSN
 * 
 */
  export const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey],
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey,
): Obj[FirstKey][SecondKey] => {
  return obj[firstKey][secondKey]
};
