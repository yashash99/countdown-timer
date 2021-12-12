export class Timer {
    timerId?: NodeJS.Timeout
    callback?: (...args: any) => void
    time?: number
    set(callback: (...args: any) => void, time: number) {
        this.callback = callback
        this.time = time
    }
    start() {
        this.callback!()
        this.timerId = setInterval(this.callback!, this.time!)
    }
    stop() {
        if (this.timerId)
            clearInterval(this.timerId)
    }
    restart() {
        this.stop()
        this.start()
    }
}