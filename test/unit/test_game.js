var game

class DummyDeckLoader extends DeckLoader {
    loadDeck(deckName) {
        return new Deck(deckName, [
            new FlashCard("test question 1", "test answer 1"),
            new FlashCard("test question 2", "test answer 2")
        ])
    }
}

describe("Game Test", () => {
    before(() => {
        game = new Game(new DummyDeckLoader())
    })

    it("should be in await state initially", () => {
        expect(game.state.toString()).to.deep.equal("awaitgame")
    })

    it("should be in ready state when deck is loaded", async () => {
        await game.load("testgame")

        expect(game.state.toString()).to.deep.equal("ready")
    })

    it("should have an available deck when ready", async () => {
        await game.load("testgame")

        expect(game.deck.cards.length).to.deep.equal(2)
    })

    it("should be in question state when play is requested", async () => {
        await game.load("testgame")
        game.play()

        expect(game.state.toString()).to.deep.equal("play")
    })

    it("should have a question loaded when play is requested", async () => {
        await game.load("testgame")
        game.play()

        expect(game.currentCard.question).to.deep.equal("test question 1")
    })

    it("should have one fewer card in the deck when asking a question", async () => {
        await game.load("testgame")
        game.play()

        expect(game.deck.cards.length).to.deep.equal(1)
    })

    it("should move to the correct state when matching answer is submitted", async () => {
        await game.load("testgame")
        game.play()
        game.answer("test answer 1")

        expect(game.state).to.deep.equal("correct")
    })

    it("should set answer correct to true on correct answer", async () => {
        await game.load("testgame")
        game.play()
        game.answer("test answer 1")

        expect(game.answeredCorrect).to.deep.equal(true)
    })

    it("should increment user score on correct answer", async () => {
        await game.load("testgame")
        game.play()
        game.answer("test answer 1")

        expect(game.score.current).to.deep.equal(1)
    })

    it("should increment best score on correct answer", async () => {
        await game.load("testgame")
        game.play()
        game.answer("test answer 1")

        expect(game.score.best).to.deep.equal(1)
    })
})
