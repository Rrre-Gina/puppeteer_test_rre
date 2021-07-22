const currentDate = (UTC) => {
    return new Date( new Date().getTime() + UTC * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
}

module.exports = {currentDate}