import {
    createDoors,
    chooseDoor,
    revealNonPrize,
    unChooseDoor,
} from "./util/door";
import { random } from "./util/random";

function montyHallStrategy(): boolean {
    const doors = createDoors();
    const firstChoiceIndex = random(0, 2);
    const firstChoice = doors[firstChoiceIndex];

    chooseDoor(firstChoice);
    const nonPrizeIndex = revealNonPrize(doors);

    const newSelectionIndex = [0, 1, 2].find(
        (i) => i !== firstChoiceIndex && i !== nonPrizeIndex
    )!;
    const newSelection = doors[newSelectionIndex];

    unChooseDoor(firstChoice);
    chooseDoor(newSelection);

    return doors[newSelectionIndex].prize;
}

function testMontyHallStrategy(iterations: number): number {
    let hits = 0;

    for (let i = 0; i < iterations; i++) {
        if (montyHallStrategy()) {
            hits++;
        }
    }

    return hits;
}

(function main() {
    const iterations = 1_000_000;
    const hits = testMontyHallStrategy(iterations);

    console.log(
        `Got ${hits} out of ${iterations}, (${(hits / iterations) * 100} %)`
    );
})();
