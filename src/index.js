import {createStore} from "redux"

let recorderState;
const initialState = [
    {
        bookId :0,
        bookName: "Test Book"
    }
]

const reducer = function(state = initialState, action) {
    recorderState = state;
    switch (action.type) {
        case "addBook":
            return [
                ...state,
                {
                    bookId: action.info.bookId,
                    bookName: action.info.bookName
                }
            ]
        case "delBook":
            return [
                ...state
            ]
        default:
            return [
                ...state
            ];
    }
}

const store = createStore(reducer)



  



const root = document.getElementById('app')
const addBook = document.getElementById('addBook')
const delBook = document.getElementById('delBook')
const bookList = document.getElementById('bookList')

const addBookBtn = document.createElement('button')
const bookNameInput = document.createElement('input')
const delBookBtn = document.createElement('button')
const bookIdInput = document.createElement('input')


addBookBtn.innerText = "Add Book"
delBookBtn.innerText = "Delete Book"

addBookBtn.addEventListener('click',addBookFn);
delBookBtn.addEventListener('click',delBookFn);

addBook.appendChild(bookNameInput)
addBook.appendChild(addBookBtn)

delBook.appendChild(bookIdInput)
delBook.appendChild(delBookBtn)


function* generateID(){
    let id = 100
    while(true) {
        yield id++
    }
}

const generateId = generateID()
const getBookId = () => generateId.next().value

function addBookFn(){
    console.log("ADD BOOK");
    const bookName = bookNameInput.value
    if(bookName){
        const bookID = getBookId()
        bookNameInput.value = ''
        const action = {
            type : "addBook",
            info:{
                bookID: bookID,
                bookName: bookName
            }
        }
        store.dispatch(action)
    }else{
        console.log("need input bookName");
    }
}

function delBookFn(){
    console.log("DELETE BOOK");
}

// const showState = store.subscribe(()=>{
//     const currentState = store.getState()
//     console.log("old state", recorderState);
//     console.log("new state", currentState);
// })

const showState = store.subscribe(()=>{

    console.log("old state", recorderState);
    console.log("new state", store.getState());
})



const showNewList = store.subscribe(()=>{
    const currentState = store.getState()
    if (currentState.length !== recorderState.length){
        bookList.innerText =""
        currentState.forEach(element =>{
            bookList.appendChild(CreateBookList(element))
        })
    }
})

function CreateBookList(info){
    const element = document.createElement("li")
    element.innerText = `BookID: ${info.bookID} BookName: ${info.bookName}`
    return element
}