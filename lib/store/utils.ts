// export function createUseSelectors<T extends Record<string, any>>(store: (<U>(selector: (s: T) => U) => U) & { getState(): T }) {
//     type Keys = keyof T & string;
//     type UseSelectors = {
//         [K in Keys as `use${Capitalize<K>}`]: () => T[K];
//     };

//     const hooks = {} as UseSelectors; // אין Partial כאן
//     const state = store.getState();

//     (Object.keys(state) as Keys[]).forEach((k) => {
//         const hook_key = `use${k.charAt(0).toUpperCase()}${k.slice(1)}` as `use${Capitalize<Keys>}`;
//         (hooks as unknown as Record<string, unknown>)[hook_key] = () => store((s) => s[k]);
//     });

//     return hooks;
// }


export const createSelectors = <T extends object>(store: any) => {
    const selectors: { [K in keyof T]: () => T[K] } = {} as any;
    for (const k of Object.keys(store.getState()) as Array<keyof T>) {
        selectors[k] = () => store((s: T) => s[k]);
    }
    return selectors;
};