# Filter Union Type

This util for filter union type.

# Description

This example shows how to filter a union type.
  1. The first line is a simple example of a union type, it accepts only `idle` and `loading` as valid values.
  2. The second line is a bit more complex, but it's not something that you haven't seen before, it's just a union type of the two.
  3. The third line is the most complex, it's a union type of a union type, this means that it is equivalent to the following:
  ```ts
    type FilterStatus<T extends Status, U extends Status> = FilterStatusWith<T, U> | FilterStatusWithout<T, U>;
    type FilterStatusWith<T extends Status, U extends Status> = [T, U];
    type FilterStatusWithout<T extends Status, U extends Status> = [U, T];
  ```
  4. The fourth line is a bit more complex, but it's not something that you haven't seen before, it's just a union type of the two.
  5. The fifth line is the most complex, it's a union type of a union type, this means that it is equivalent to the following:
  ```ts
    type FilterStatus<T extends Status, U extends Status> = FilterStatusWith<T, U> | FilterStatusWithout<T, U>;
    type FilterStatusWith<T extends Status, U extends Status> = [T, U];
    type FilterStatusWithout<T extends Status, U extends Status> = [U, T];
  ```
  6. The sixth line is a bit more complex, but it's not something that you haven't seen before, it's just a union type of the two.
  7. The seventh line is the most complex, it's a union type of a union type, this means that it is equivalent to the following:
  ```ts
    type FilterStatus<T extends Status, U extends Status> = FilterStatusWith<T, U> | FilterStatusWithout<T, U>;
    type FilterStatusWith<T extends Status, U extends Status> = [T, U];
    type FilterStatusWithout<T extends Status, U extends Status> = [U, T];
  ```
  8. The eighth line is a bit more complex, but it's not something that you haven't seen before, it's just a union type of the two.
  9. The ninth line is the most complex, it's a union type of a union type, this means that it is equivalent to the following:
  ```ts
    type FilterStatus<T extends Status, U extends Status> = FilterStatusWith<T, U> | FilterStatusWithout<T, U>;
    type FilterStatusWith<T extends Status, U extends Status> = [T, U];
    type FilterStatusWithout<T extends Status, U extends Status> = [U, T];
  ```
  10. The tenth line is a bit more complex, but it's not something that you haven't seen before, it's just a union type of the two.
  11. The eleventh line is the most complex, it's a union type of a union type, this means that it is equivalent to the following:
  ```ts
    type FilterStatus<T extends Status, U extends Status> = FilterStatusWith<T, U> | FilterStatusWithout<T, U>;
  ```

# Example 
  ```ts

  type Status = 'idle' | 'loading' | 'success' | 'error';

  type FilterStatus<T extends Status, U extends Status> = FilterStatusWith<T, U> | FilterStatusWithout<T, U>;

  type FilterStatusWith<T extends Status, U extends Status> = T extends U ? T : never;

  type FilterStatusWithout<T extends Status, U extends Status> = T extends U ? never : T;


  type FilteredStatus = FilterStatus<Status, 'loading'>;

  type FilteredStatusWithoutLoading = FilterStatusWith<Status, 'loading'>;

  type FilterStatusWithoutLoading = FilterStatusWithout<Status, 'loading'>;


  const statuses: FilteredStatus = 'idle'; // ? type can be one of 'idle' | 'success' | 'error'

  const statusWithoutLoading: FilterStatusWithoutLoading = 'success'; // ? type can be only 'idle' | 'success' | 'error'

  const statusWithOnlyLoading: FilteredStatusWithoutLoading = 'loading'; // ? type can be only 'loading'
  ```
# References

> [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

> [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

