# Flash Card Simulator

## User Stories
1. Load a game (deck)
1. Guess a card - get it right
1. Guess a card - get it wrong
1. View right and wrong answers at the end
1. Create a new deck

## User Guide - Creating Decks
* Build decks by writing CSV files
* Don't break CSVs into more folders
* Don't use anything but alphanumerics and spaces in the CSV names
* Cards must be formatted like so

```CSV
"question text here", "answer text here",
"next question", "next answer"
```

New notes:
    * Show ones you got wrong
        * mini review of the incorrect answers
        * round 2
        * random is a nice touch
    * Add/delete cards and build decks
