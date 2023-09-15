class GameFinder {
    constructor() {
        this.BASE_PATH = "../../decks/"
    }

    getPath(path) {
        return `${this.BASE_PATH}${path}`
    }

    getFileListName(subpath) {
        return `${this.getPath(subpath)}/files.txt`
    }

    removeExt(item) {
        let split = item.split(".")
        split.pop()
        return split.join(".")
    }

    parseToList(data) {
        return data.split('\n').map(this.removeExt)
    }

    async find(subpath) {
        return this.parseToList(
            await (
                await fetch(this.getFileListName(subpath ? subpath : ""))
            ).text()
        )
    }
}
