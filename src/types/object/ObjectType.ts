import {Dispatch, RefObject, SetStateAction} from 'react';

export type ObjectRef<T> = RefObject<T> | null | ((instance: T | null) => void);
export type ObjectKey = string | number;
export type ObjectState<S> = [S, Dispatch<SetStateAction<S>>];
export type ObjectPartial<P> = {[K in keyof P]?: P[K]};
