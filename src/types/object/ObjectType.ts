import {RefObject} from 'react';

export type ObjectRef<T> = RefObject<T> | null | ((instance: T | null) => void);
export type ObjectKey = string | number;
