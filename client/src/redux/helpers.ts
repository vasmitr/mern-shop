export const fetchDataMixin = {
    loading: false,
    success: false,
    error: '',
    data: null as any
};


type Action<P, T> = {
    (payload: P): {
        payload: P;
        type: T;
    };
    type: T;
};

export function createAction<P = void, T = string,> (
    type: T extends string ? T : never
) {
    const action: Action<P, T> = (payload: P) => ({
        payload,
        type
    });

    action.type = type;

    return action;
}