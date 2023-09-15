class CSVFileLoader extends FileLoader {
    constructor() {
        super()
        this.FILE_EXTENSION = ".csv"
        this.BASE_FILEPATH = "../../../decks/"
    }

    getFilepath(filename) {
        return `${this.BASE_FILEPATH}${filename}${this.FILE_EXTENSION}`
    }

    async loadFile(filename) {
        return (await fetch(this.getFilepath(filename))).text()
    }
}
