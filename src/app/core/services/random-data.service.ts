import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

const firstNames = [
    'John',
    'Sarah',
    'Jason',
    'Christian',
    'Jessica',
    'Jonathan',
    'Gordon',
    'Simon',
    'Jason',
    'Whitney',
    'Chris',
    'David'
];
const lastNames = ['Doe', 'Parker', 'Goldwell', 'Bow', 'Bale', 'Smith', 'Jason', 'Swan', 'Carter', 'Copper'];
const positions = ['Marketing Manager', 'Visual Designer', 'Software Developer'];
const plans = ["PersonBasic", "PersonBusiness"]


@Injectable({ providedIn: 'root' })
export class RandomDataExampleService {
    generate(num: number = 125): Person[] {
        const people: Person[] = [];

        for (let i = 0; i < num; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const position = positions[Math.floor(Math.random() * positions.length)];
            const type = plans[Math.floor(Math.random() * plans.length)]

            people.push({
                id: this._generateId(),
                profile:  {
                    firstName,
                    lastName,
                    imageUrl : this._generateImage()
                },
                position,
                phone: this._generatePhone(),
                email: this._generateEmail(firstName, lastName),
                name: `${firstName} ${lastName}`,
                type
            });
        }

        return people;
    }

    private _generateImage() {
        const option = Math.floor(Math.random() * 3);

        return   `https://i.pravatar.cc/400?u=${this._generateId()}`  
    }

    private _generateId(): string {
        return Math.random().toString(36).substring(6);
    }

    private _generateEmail(firstName: string, lastName: string): string {
        return `${firstName}_${lastName}_${Math.random().toString(36).substring(6)}@example.com`;
    }

    private _generatePhone(): string {
        return '+216' + Math.random().toString().slice(2, 11);
    }
}