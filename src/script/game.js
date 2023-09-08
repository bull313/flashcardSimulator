class Game {
    constructor(deckLoader) {
        this.state = new AwaitGame()
        this.deckLoader = deckLoader
            || new FileDeckLoader(new CSVFileLoader(), new CSVDeckGenerator())
        this.deck = null
        this.currentCard = null
        this.answeredCorrect = null
        this.score = new Score()
    }

    async load(deckName) {
        this.deck = await this.deckLoader.loadDeck(deckName)
        this.state = new Ready()
    }

    play() {
        this.state = new Play()
        this.currentCard = this.deck.cards.shift()
    }

    updateScore() {
        this.score = this.state.updateScore(this.score)
    }

    answer(guess) {
        this.answeredCorrect = guess === this.currentCard.answer
        this.state = (this.answeredCorrect) ? new Correct() : new Incorrect()
        this.updateScore()
    }
}
