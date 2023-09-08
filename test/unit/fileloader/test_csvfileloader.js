const FILENAME = "test/testgame"
const FILEDATA = `"What… is your name?", "My name is Sir Lancelot of Camelot."
"What… is your quest?", "To seek the Holy Grail."
"What… is your favourite colour?", "Blue.",
"What… is the capital of Assyria?", "I don’t know that.",
"What… is the air-speed velocity of an unladen swallow?", "What do you mean? An African or European swallow?"
`

var fileLoader
var data

describe("CSV File Loader Test", () => {
    beforeEach(() => {
        fileLoader = new CSVFileLoader()
    })

    it("should output the contents of the testgame file", async () => {
        data = await fileLoader.loadFile(FILENAME)
        expect(data).to.equal(FILEDATA)
    })
})
