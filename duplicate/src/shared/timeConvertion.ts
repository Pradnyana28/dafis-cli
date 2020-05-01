export interface ITimeConvertion {
    (n: number, i: string)
    toMs(n: number | null | undefined): number
    toSecond(n: number | null | undefined): number
    toMinute(n: number | null | undefined): number
    toHour(n: number | null | undefined): number
}

const timeConvertion = (n: number, i: string): any => {
    let convertion = 0;
    let initialNumber = n;

    const toMs = (num: number = null): number => {
        const n = num || initialNumber;
        if (i == 's') convertion = n * 1000;
        if (i == 'ms') convertion = n * 1;
        if (i == 'm') convertion = toSecond(n) * 1000;
        if (i == 'h') convertion = toSecond(n) * 1000;
        return convertion;
    }

    const toSecond = (num: number = null): number => {
        const n = num || initialNumber;
        if (i == 's') convertion = n * 1;
        if (i == 'ms') convertion = n / 1000;
        if (i == 'm') convertion = n * 60;
        if (i == 'h') convertion = n * 60 * 60;
        return convertion;
    }

    const toMinute = (num: number = null): number => {
        const n = num || initialNumber;
        if (i == 's') convertion = n / 60;
        if (i == 'ms') convertion = (n / 1000) / 60;
        if (i == 'm') convertion = n * 1;
        if (i == 'h') convertion = n * 60;
        return convertion;
    }

    const toHour = (num: number = null): number => {
        const n = num || initialNumber;
        if (i == 's') convertion = toMinute(n) * 60;
        if (i == 'ms') convertion = toMinute(n) * 60;
        if (i == 'm') convertion = n * 60;
        if (i == 'h') convertion = n * 1;
        return convertion;
    };
}

export default timeConvertion;