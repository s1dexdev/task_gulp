// const Restaraunt = './Restaurant.ts';

const restPositions = {
    1: 'manager',
    2: 'barman',
    3: 'cook',
    4: 'waiter',
};

const restDepartments = [
    {
        title: 'Bar',
        id: '1',
        employees: [
            {
                name: 'James',
                surname: 'James',
                departmentId: '1',
                position: restPositions[1],
                salary: 5000,
                isFired: false,
            },
            {
                name: 'Robert',
                surname: 'Robert',
                departmentId: '1',
                position: restPositions[2],
                salary: 3000,
                isFired: false,
            },
            {
                name: 'John',
                surname: 'John',
                departmentId: '1',
                position: restPositions[2],
                salary: 3000,
                isFired: false,
            },
        ],
    },
    {
        title: 'Cook',
        id: '2',
        employees: [
            {
                name: 'Mary',
                surname: 'Mary',
                departmentId: '2',
                position: restPositions[1],
                salary: 6000,
                isFired: false,
            },
            {
                name: 'Patricia',
                surname: 'Patricia',
                departmentId: '2',
                position: restPositions[3],
                salary: 4000,
                isFired: false,
            },
            {
                name: 'Jennifer',
                surname: 'Jennifer',
                departmentId: '2',
                position: restPositions[3],
                salary: 4000,
                isFired: false,
            },
            {
                name: 'Jennifer',
                surname: 'Jennifer',
                departmentId: '2',
                position: restPositions[3],
                salary: 4000,
                isFired: false,
            },
        ],
    },
    {
        title: 'Hall',
        id: '3',
        employees: [
            {
                name: 'Michael',
                surname: 'Michael',
                departmentId: '2',
                position: restPositions[1],
                salary: 3000,
                isFired: false,
            },
            {
                name: 'Linda',
                surname: 'Linda',
                departmentId: '2',
                position: restPositions[3],
                salary: 1000,
                isFired: false,
            },
            {
                name: 'Elizabeth',
                surname: 'Elizabeth',
                departmentId: '2',
                position: restPositions[3],
                salary: 1000,
                isFired: false,
            },
            {
                name: 'Elizabeth',
                surname: 'Elizabeth',
                departmentId: '2',
                position: restPositions[3],
                salary: 1000,
                isFired: false,
            },
            {
                name: 'Elizabeth',
                surname: 'Elizabeth',
                departmentId: '2',
                position: restPositions[3],
                salary: 1000,
                isFired: true,
            },
        ],
    },
];

const bankClients = [
    {
        name: 'James',
        surname: 'Jameson',
        id: '01',
        isActive: true,
        registrationDate: new Date().toLocaleDateString(),
        accounts: [
            {
                id: '100',
                typeAcc: 'debit',
                currency: 'USD',
                balance: 5000,
                expiryDate: '11/11/2024',
                isActive: true,
            },
            {
                id: '101',
                typeAcc: 'credit',
                currency: 'USD',
                creditLimit: 10000,
                balance: {
                    own: 0,
                    credit: 10000,
                },
                expiryDate: '11/11/2024',
                isActive: true,
            },
        ],
    },
    {
        name: 'Robert',
        surname: 'Robertson',
        id: '02',
        isActive: true,
        registrationDate: new Date().toLocaleDateString(),
        accounts: [
            {
                id: '200',
                typeAcc: 'debit',
                currency: 'USD',
                balance: 3000,
                expiryDate: '11/11/2024',
                isActive: true,
            },
            {
                id: '201',
                typeAcc: 'credit',
                currency: 'USD',
                creditLimit: 5000,
                balance: {
                    own: 0,
                    credit: 3000,
                },
                expiryDate: '11/11/2024',
                isActive: true,
            },
        ],
    },
    {
        name: 'John',
        surname: 'Johnson',
        id: '03',
        isActive: true,
        registrationDate: new Date().toLocaleDateString(),
        accounts: [
            {
                id: '300',
                typeAcc: 'debit',
                currency: 'USD',
                balance: 7000,
                expiryDate: '11/11/2024',
                isActive: true,
            },
            {
                id: '301',
                typeAcc: 'credit',
                currency: 'USD',
                creditLimit: 15000,
                balance: {
                    own: 0,
                    credit: 15000,
                },
                expiryDate: '11/11/2024',
                isActive: true,
            },
        ],
    },
    {
        name: 'Linda',
        surname: 'Tevit',
        id: '04',
        isActive: true,
        registrationDate: new Date().toLocaleDateString(),
        accounts: [
            {
                id: '300',
                typeAcc: 'debit',
                currency: 'UAH',
                balance: 10000,
                expiryDate: '11/11/2024',
                isActive: true,
            },
            {
                id: '301',
                typeAcc: 'credit',
                currency: 'UAH',
                creditLimit: 50000,
                balance: {
                    own: 0,
                    credit: 30000,
                },
                expiryDate: '11/11/2024',
                isActive: true,
            },
        ],
    },
];

document.addEventListener('DOMContentLoaded', event => {
    // console.log(Restaraunt);
});
