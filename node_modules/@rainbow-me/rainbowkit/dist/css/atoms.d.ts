/// <reference types="react" />
import { Sprinkles } from './sprinkles.css';
export type Atoms = Sprinkles & {
    reset?: keyof JSX.IntrinsicElements;
};
export declare const atoms: ({ reset, ...rest }: Atoms) => string;
