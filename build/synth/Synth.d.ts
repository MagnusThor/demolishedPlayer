declare class Synth {
    static vs: string;
    static G(dsp: string, sr: number, w: number, h: number): (t: number, c: number, _b?: any) => any;
    static P(gen: Function): void;
}
