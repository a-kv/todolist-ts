import {userReducer} from "./user-reducer";
//ok
test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}; // стартовый стейт

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})// конечный стейт

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});
//ok
test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})// конечный стейт
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});
//ok
test('user reducer should change name of user', () => {
    const startState = {name: 'Dimych', age: 20, childrenCount: 2};
    const newName = 'Viktor';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName);
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);// так как нам необходимо новое значение, а не просто изменение текущего стейта в toBe() кладем переменную newName
});



