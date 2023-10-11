import { Todo } from '../todos/models/todo.model';

export const Filters ={
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}
const state ={
    todos:[
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del marfil'),
        new Todo('Piedra del Realidad'),
    ],
    filter: Filters.All,
}

const iniStore = () => {
    loadStore();
    console.log('InitStore');
}

const loadStore = () => {
    // throw new Error('Not implemented');
    if(!localStorage.getItem('state')) return;
    // if(!state)
    const { todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;

    state.filter = filter;

}
const saveStateToLocal = () => {
    localStorage.setItem('state', JSON.stringify(state));
    // console.log(JSON.stringify(state));


}

const getTodos = ( filter = Filters.All ) => {
    switch( filter ){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Option ${ filter } is not valid`);   
    }
}
/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {

    if( !description ) throw new Error('Description required'); 
    
    state.todos.push( new Todo(description) );

    saveStateToLocal();
    
}

const toggleTodo = ( todoId ) => {

    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocal();
    
}

const deleteTodo = ( todoId ) => {
    
    state.todos = state.todos.filter( todo => todo.id !== todoId);

    saveStateToLocal();
}

const deleteCompleted = ( ) => {
    state.todos = state.todos.filter( todo => !todo.done );

    saveStateToLocal();
}

const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocal();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default{
    getTodos,
    iniStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    loadStore   
}