declare module 'worker-loader!*' {
    class WebpackWorker extends Worker {
        constructor();

        terminate(): void
    }

    export default WebpackWorker;
}
