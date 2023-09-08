describe("Game Finder Test", () => {
    it("should find games in given subpath", async () => {
        let gameFinder = new GameFinder()
        let games = await gameFinder.find("test")

        expect(games).to.deep.equal([ "testgame" ])
    })
})
