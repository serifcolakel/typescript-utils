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