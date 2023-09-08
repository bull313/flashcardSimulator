const NAME = "test/testgame"
const QUESTION1 = "What is 1 + 1?"
const ANSWER1 = "Fun"
const QUESTION2 = "What is 2 + 2?"
const ANSWER2 = "You"
const DATA = `"${QUESTION1}", "${ANSWER1}
"${QUESTION2}", "${ANSWER2}"
`

var generator
var deck

describe("CSV Deck Generator Test", () => {
    beforeEach(() => {
        generator = new CSVDeckGenerator()
        deck = generator.generateDeck(NAME, DATA)
    })

    it("should generate deck has given name", () => {
        expect(deck.name).to.deep.equal(NAME)
    })

    it("should generate deck has two cards", () => {
        expect(deck.cards.length).to.deep.equal(2)
    })

    it("should generate deck has correct questions", () => {
        expect(deck.cards[0].question).to.deep.equal(QUESTION1)
        expect(deck.cards[1].question).to.deep.equal(QUESTION2)
    })

    it("should generate deck has correct answers", () => {
        expect(deck.cards[0].answer).to.deep.equal(ANSWER1)
        expect(deck.cards[1].answer).to.deep.equal(ANSWER2)
    })
})
