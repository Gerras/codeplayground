type AnagramObject = {
  initialValue: number;
  comparisonValue: number;
};

/**
 * Tests a value with a list of comparisons to see if the list contains anagrams of the test value.
 *
 * @param testWord The value in which we are trying to discern if there are any provided anagrams.
 * @param comparisons An array of values we are seeing if are anagrams.
 * @returns A list of all found anagrams.
 */
const findAnagrams = (testWord: string, comparisons: string[]) => {
  const anagramDictionary = initializeDictionary(testWord);
  return iterateComparisons(testWord, comparisons, anagramDictionary);
};

/**
 * Create a dictionary of each character of the test word and an object to comapre the other words with.
 *
 * @param testWord The value to initialize the anagram dictionary with.
 * @returns A dictionary of characters to track.
 */
const initializeDictionary = (testWord: string) => {
  return testWord
    .split("")
    .reduce<Record<string, AnagramObject>>((acc, char) => {
      if (acc[char]) {
        acc[char].comparisonValue++;
        acc[char].initialValue++;
      } else {
        acc[char] = { comparisonValue: 1, initialValue: 1 };
      }

      return acc;
    }, {});
};

/**
 * Resets the dicitionary of characters to their initial values.
 *
 * @param anagramDictionary The dictionary of characters.
 */
const resetDictionary = (anagramDictionary: Record<string, AnagramObject>) => {
  Object.keys(anagramDictionary).forEach((key) => {
    const initialValue = anagramDictionary[key].initialValue;
    anagramDictionary[key].comparisonValue = initialValue;
  });
};

/**
 * Iterates all words in the test word and evalutes the following conditions:
 * 1. If the word is not the same length as the test word it cannot be an anagram so dicard.
 * 2. If they are the same length evaluate the word:
 *  2a. Split the comparison word into it's characters and check to see if they are already in the dictionary.
 *    IF they are not, then return false, this isn't an anagram
 *    IF they are, then subtract 1 from the character under evaluation and continue
 *  2b. If we reach the end of the word we then check the dictionary to see if all values are 0, if they are we have found an anagram so return true, false otherwise.
 *
 * At the end it will reset the dictionary to it's initial state IF there are more words to test.
 *
 * @param testWord The word under test.
 * @param comparisons The list of comparisons to test for anagrams.
 * @param anagramDictionary The character dictionary.
 * @returns All the found anagrams
 */
const iterateComparisons = (
  testWord: string,
  comparisons: string[],
  anagramDictionary: Record<string, AnagramObject>
) => {
  const allAnagrams: string[] = [];
  for (let index = 0; index < comparisons.length; index++) {
    const word = comparisons[index];
    if (word.length !== testWord.length) {
      continue;
    }
    const isAnagram = evaluateAnagramWord(word, anagramDictionary);
    if (isAnagram) {
      allAnagrams.push(word);
    }
    if (index !== comparisons.length - 1) {
      resetDictionary(anagramDictionary);
    }
  }
  return allAnagrams;
};

const evaluateAnagramWord = (
  word: string,
  anagramDictionary: Record<string, AnagramObject>
) => {
  // If we really care about efficieny this should be a forloop, but I'm lazy :D.
  word.split("").forEach((char) => {
    if (!anagramDictionary[char]) {
      return false;
    }
    anagramDictionary[char].comparisonValue--;
  });

  return Object.values(anagramDictionary).every(
    (anagramCharacter) => anagramCharacter.comparisonValue === 0
  );
};

// The inefficient way of doing the same thing. Way less code, maybe easier to maintain? Might be worth doing it this way if the data set was small.
// I think this might also have a bug in it. Something around not keeping count of how many characters of each type there are.
const inefficientAnagramComparison = (
  testWord: string,
  comparisons: string[]
) => {
  const sortedTestWord = testWord.split("").sort();
  return comparisons
    .map<string | null>((comparisonWord) => {
      const sortedComparisonWord = comparisonWord.split("").sort();
      if (
        sortedComparisonWord.every((character) =>
          sortedTestWord.includes(character)
        )
      ) {
        return comparisonWord;
      } else {
        return null;
      }
    })
    .filter((x) => x); // filters out null values
};

// Testing
console.log(findAnagrams("dissenter", ["residents", "education", "tiredness"]));
console.log(
  inefficientAnagramComparison("dissenter", [
    "residents",
    "education",
    "tiredness",
  ])
);
