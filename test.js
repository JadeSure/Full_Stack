let myList = [{
    id :1,
    age :2
}, {
    id :2,
    age:3
}]

const index = myList.findIndex(item =>item.id  === 1)
// 0
// console.log(index);


// console.log(taskIndex);
const [task] = myList.splice(undefined,1)
console.log('delete',task);
console.log("array own",myList);


