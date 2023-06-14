/**
 * Whatamesh by @jordienr & @ndom91
 * https://whatamesh.vercel.app
 *
 * Codebase was adopted for web3modal
 */
export default class Whatamesh {
    angle: number;
    t: number;
    last: number;
    height: number;
    amp: number;
    seed: number;
    freqX: number;
    freqY: number;
    freqDelta: number;
    activeColors: number[];
    isMetaKey: boolean;
    playing: boolean;
    constructor(...t: any[]);
    play(selector: any): void;
    stop(): void;
    connect(): Promise<void>;
    initMaterial(): any;
    initMesh(): void;
    shouldSkipFrame(e: any): true | undefined;
    updateFrequency(e: any): void;
    toggleColor(index: any): void;
    init(): void;
    waitForCssVars(): void;
    initGradientColors(): void;
}
