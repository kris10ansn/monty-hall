import { random } from "./random";

export interface Door {
    prize: boolean;
    chosen: boolean;
    open: boolean;
}

export const door = (prize: boolean): Door => ({
    prize,
    chosen: false,
    open: false,
});

export const createDoors = (): Door[] => {
    const doors = [];
    const prizeIndex = random(0, 2);

    for (let i = 0; i < 3; i++) {
        doors.push(door(i === prizeIndex));
    }

    return doors;
};

export const chooseDoor = (door: Door) => (door.chosen = true);
export const unChooseDoor = (door: Door) => (door.chosen = false);
export const openDoor = (door: Door) => (door.open = true);

export const revealNonPrize = (doors: Door[]) => {
    const listOfDoors = Array(3)
        .fill(null)
        .map((_, i) => doors[i]);

    while (listOfDoors.length > 0) {
        const index = random(0, listOfDoors.length - 1);
        const door = listOfDoors[index];

        if (!door.chosen && !door.open && !door.prize) {
            openDoor(door);
            return doors.indexOf(door);
        }

        listOfDoors.splice(index, 1);
    }

    return -1;
};
