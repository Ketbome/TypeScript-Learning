interface Avenger {
    name: string;
    powerScore: number;
    wonBattle: number;
    age: number;
}

class Avenger implements Avenger{
    constructor(name: string, powerScore: number) {
        this.name = name;
        this.powerScore = powerScore;
    }

    get fullName(): string {
        return this.name;
    }

    set power(newPower: number) {
        if (newPower <= 100) {
            this.powerScore = newPower;
        } else{
            throw new Error("Power score cannot be greater than 100");
        }
    }
}

const avengers = new Avenger("Iron Man", 100);
avengers.name = "Hulk"; // No tiene Sentido