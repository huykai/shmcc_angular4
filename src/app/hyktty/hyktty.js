function hyktty(argv) {
    this.argv_ = argv;
    this.io = null;
    this.pid_ = -1;
    this.socket = argv.argString.socket;
}

hyktty.prototype.run = function() {
    this.io = this.argv_.io.push();
    //this.io = {};
    this.io.onVTKeystroke = this.sendString_.bind(this);
    this.io.sendString = this.sendString_.bind(this);
    this.io.onTerminalResize = this.onTerminalResize.bind(this);
}

hyktty.prototype.sendString_ = function(str) {
    this.socket.emit('input', str);
};

hyktty.prototype.onTerminalResize = function(col, row) {
    this.socket.emit('resize', { col: col, row: row });
};

module.exports = { hyktty }