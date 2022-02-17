import Kanban from "./view/Kanban.js";
import KanbanAPI from "./api/KanbanAPI.js";

new Kanban(document.querySelector(".kanban"));

var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

var firstday = new Date(curr.setDate(first));
var lastday = new Date(curr.setDate(last));

document.getElementById("week").innerHTML = "Week of " + firstday.toLocaleString('default', { month: 'short' }) + " " + firstday.getDate() + " - " + lastday.toLocaleString('default', { month: 'short' }) + " " + lastday.getDate()

let resetButton = document.querySelector(".kanban__clear-all")
resetButton.addEventListener("click", () => {
    const check = confirm('Are you sure you want to erase all your data?')
    if(check){
        localStorage.clear();
        document.location.reload();
    }

})