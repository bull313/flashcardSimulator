class FileDeckLoader extends DeckLoader {
    constructor(fileLoader, deckGenerator) {
        super()
        this.fileLoader = fileLoader
        this.deckGenerator = deckGenerator
    }

    async loadDeck(deckName) {
        return this.deckGenerator.generateDeck(
            deckName, await this.fileLoader.loadFile(deckName)
        )
    }
}
