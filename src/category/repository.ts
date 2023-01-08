import { User } from './user';

const users: User[] = [
    {
        id: 1,
        username: 'Ivan',
        age: 20,
        hobbies: ['IT', 'football']
    },
    {
        id: 2,
        username: 'Vasya',
        age: 25,
        hobbies: ['IT', 'tennis']
    }
]

let newId = (function(){
    let id = users.length;
    return () => id++;
})();

export function getUsers(): Promise<User[]>{
    return Promise.resolve(users);
}

export function getUserById(id: number): Promise<User | undefined> {
    const user = users.find((cat) => cat.id === id);
    return Promise.resolve(user);
}

export function deleteUser(id: number): Promise<void> {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
        return Promise.reject('User not found');        
    }
    users.splice(userIndex, 1)
    return Promise.resolve()
}

export function createUser(data: User): Promise<User> {
    const isExists = users.findIndex((user) => user.username === data.username) >=0;
    if( isExists) {
        return Promise.reject(new Error(`User with name ${data.username} already exists`))
    }
    const newUser: User = {
        ...data,
        id: newId()
    };
    users.push(newUser);
    return Promise.resolve(newUser);
}