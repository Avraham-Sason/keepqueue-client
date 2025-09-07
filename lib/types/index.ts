export type StringObject<T> = {
    [key: string]: T;
};
export type SetState<T> = (updater: ((prev: T) => T) | T) => void;


