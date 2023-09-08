var loader
var deck

class DummyFileLoader extends FileLoader {
    loadFile() {
        return "testgame"
    }
}

class DummyDeckGenerator extends DeckGenerator {
    generateDeck(name) {
        let cards = [ new FlashCard("What is 1 + 1?", "Fun") ]
        return new Deck(name, cards)
    }
}

describe("File Deck Loader Test", () => {
    beforeEach(async () => {
        loader = new FileDeckLoader(
            new DummyFileLoader(), new DummyDeckGenerator()
        )

        deck = await loader.loadDeck("testgame")
    })

    it("should have the given name", () => {        
        expect(deck.name).to.deep.equal("testgame")
    })

    it("should have the same composition of cards", () => {
        expect(deck.cards.length).to.deep.equal(1)
        expect(deck.cards[0].question).to.deep.equal("What is 1 + 1?")
        expect(deck.cards[0].answer).to.deep.equal("Fun")
    })
})
