export const fetchDataMixin = {
    loading: false,
    success: false,
    error: '',
    data: null as any
};


type Action<T, P> = {
    (payload: P): {
        type: T;
        payload: P;
    };
    type: T;
};

export function createAction<T extends string> (
    type: T
) {
    return function creator<P = void>(): Action<T, P> {
        function action (payload: P) {
            return {
                type,
                payload
            }
        }

        action.type = type;

        return action;
    }
}