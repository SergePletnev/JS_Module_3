const chokidar = require('chokidar');
const EventEmitter = require("events").EventEmitter;

class DirWatcher {
    constructor() {
        this.emitter = new EventEmitter();
    }

    watch(path, delay) {
        this.watcher = chokidar.watch(path, {
            persistent: true,
            interval: delay
        });
        this.watcher.on("change", (file) => { this.emitter.emit("change", file); })
        return this.emitter;
    }
}

module.exports = DirWatcher;