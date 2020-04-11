import * as loginActions from './loginActions';

type Values<T> = T[keyof T];

export type Actions = ReturnType<Values<typeof loginActions>>;