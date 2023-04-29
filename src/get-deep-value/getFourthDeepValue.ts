/**
 * @description Get the value of a deep object with two keys
 * @param obj The object to get the value from
 * @param firstKey The parameter to get the first key from
 * @param secondKey The parameter to get the second key from
 * @returns The value of the merged object from the first and second key
 * @example
  const deepObject = {
    name: {
      firstName: 'XXXX',
      lastName: 'YYYY',
      identifier: {
        id: '1234567890',
        type: 'SSN',
        state: {
          id: '1',
          abbreviation: 'CA',
        }
      }
    },

    age: {
      birth: 'YYYY-MM-DD',
      death: 'YYYY-MM-DD',
    }
  }
 * const deepValue = getFourthDeepValue(deepObject, 'name', 'identifier', 'state', 'id');
 * console.log(deepValue) // 1
 * 
 * const deepValue = getFourthDeepValue(deepObject, 'name', 'identifier', 'state');
 * console.log(deepValue) // { id: '1', abbreviation: 'CA' }
 * 
 * const deepValue = getFourthDeepValue(deepObject, 'name', 'identifier');
 * console.log(deepValue) // { id: '1234567890', type: 'SSN', state: { id: '1', abbreviation: 'CA' } }
 * 
 */
export const getFourthDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey],
  ThirdKey extends keyof Obj[FirstKey][SecondKey],
  FourthKey extends keyof Obj[FirstKey][SecondKey][ThirdKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey?: SecondKey,
  thirdKey?: ThirdKey,
  fourthKey?: FourthKey
):
  | Obj[FirstKey][SecondKey][ThirdKey][FourthKey]
  | Obj[FirstKey][SecondKey][ThirdKey]
  | Obj[FirstKey][SecondKey]
  | Obj[FirstKey] => {
  if (!secondKey) {
    return obj[firstKey];
  } else if (!thirdKey) {
    return obj[firstKey][secondKey];
  } else if (!fourthKey) {
    return obj[firstKey][secondKey][thirdKey];
  } else {
    return obj[firstKey][secondKey][thirdKey][fourthKey];
  }
};
