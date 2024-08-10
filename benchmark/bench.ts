export const bench = (func: Function, input: any, iterations: number) => {

    /* any boilerplate code you want to have happen before the timer starts, perhaps copying a variable so it isn't mutated */

    const start = new Date;

    for (let i = 0; i < iterations; i++) {
        func(input)
    }

    const finish = new Date

    // @ts-ignore
    return (finish - start)

}

export function benchNoInput(func: Function, iterations: number) {

    const start = new Date;

    for (let i = 0; i < iterations; i++) {
        func()
    }

    const finish = new Date

    // @ts-ignore
    return (finish - start) + "ms" + " " + (finish - start)/1000 + "s"

}