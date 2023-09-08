class Game {
    constructor(deckLoader) {
        this.state = "awaitgame"
        this.deckLoader = deckLoader
            || new FileDeckLoader(new CSVFileLoader(), new CSVDeckGenerator())
        this.deck = null
        this.currentCard = null
        this.answeredCorrect = null
        this.score = new Score()
    }

    async load(deckName) {
        this.deck = await this.deckLoader.loadDeck(deckName)
        this.state = "ready"
        this.currentCard = null
        this.answeredCorrect = null
        this.score = new Score()
    }

    play() {
        this.state = "play"
        this.currentCard = this.deck.cards.shift()
    }

    answer(guess) {
        this.state = "correct"
        ++this.score.current
        ++this.score.best
        this.answeredCorrect = true
    }
}
