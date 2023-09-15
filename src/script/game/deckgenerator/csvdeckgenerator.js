class CSVDeckGenerator extends DeckGenerator {
    constructor() {
        super()
        this.DELIM = /,|\n/
        this.questions = null
        this.answers = null
    }

    getAllValues(data) {
        return data.split(this.DELIM)
    }

    trimAllValues(values) {
        return values.map(value => value.trim())
    }

    deQuoteValues(values) {
        return values.map(value => value.replaceAll("\"", ""))
    }

    removeEmpty(values) {
        return values.filter(value => value && value.length > 0)
    }

    cleanAllValues(values) {
        return this.removeEmpty(this.deQuoteValues(this.trimAllValues(values)))
    }

    questionFilter(_, idx) {
        return idx % 2 == 0
    }

    parseDeckData(data) {
        let values = this.cleanAllValues(this.getAllValues(data))
        this.questions = values.filter(this.questionFilter)
        this.answers = values.filter(
            (_, idx) => this.questionFilter(_, idx) === false
        )

        return this.questions.map(
            (question, valueIdx) => new FlashCard(
                question, this.answers[valueIdx]
            )
        )
    }

    generateDeck(name, deckData) {
        return new Deck(name, this.parseDeckData(deckData))
    }
}
