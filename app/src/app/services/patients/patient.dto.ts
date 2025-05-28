export class Patient {
    id!: string;
    name!: string;
    age!: number;
    roomNumber!: string;
    condition!: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.roomNumber = data.roomNumber;
        this.condition = data.condition;
    }
}