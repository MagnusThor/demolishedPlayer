declare class SonantPLayer {
    song: any;
    audio: HTMLAudioElement;
    play(): void;
    textureSize: number;
    duration: number;
    WAVE_SPS: number;
    WAVE_CHAN: number;
    WAVE_SIZE: number;
    chnBufWork: Uint8ClampedArray;
    mixBufWork: Uint8ClampedArray;
    createAudio(settings: any): any;
    private osc_sin;
    private osc_square;
    private osc_saw;
    private osc_tri;
    private getnotefreq;
    constructor(song: any);
    generate: (track: any) => void;
    getData(t: any, n: any): Array<number>;
}
