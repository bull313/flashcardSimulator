var game

class DummyDeckLoader extends DeckLoader {
    load(deckName) {
        return new Deck(deckName, null)
    }
}

describe("Game Test", () => {
    before(() => {
        game = new Game(new DummyDeckLoader())
    })

    it("should be in awaiting game state initially", () => {
        expect(game.state.toString()).to.deep.equal("awaitgame")
    })

    it("should be in game init state when deck is loaded", async () => {
        await game.load("testgame")

        expect(game.state.toString()).to.deep.equal("ready")
    })
})
