import type { RouterCtrlState } from '../types/controllerTypes';
export declare const RouterCtrl: {
    state: RouterCtrlState;
    subscribe(callback: (newState: RouterCtrlState) => void): () => void;
    push(view: RouterCtrlState['view'], data?: RouterCtrlState['data']): void;
    replace(view: RouterCtrlState['view']): void;
    goBack(): void;
};
