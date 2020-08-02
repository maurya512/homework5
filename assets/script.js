// the convention of naming the id's 12,13,14 instead of 1,2,3,4 was when dynamically tried to change the color based on time 1,2,3 would show up as "past" because mathematically they're smaller than 9,10,11,12 smh. 

$(document).ready(function () {

    // a global variable that holds moment() which can be used to access the moment.js library to get real world timing
    var time = moment();

    // a function that sets the empty Planner 
    function setPlanner() {

        // grabs the class currentDay from the index.html and assigns that a time value accessed from moment.js lib
        // text helps it print onto the header
        $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm a"));

        // 
        $(".time-block").each(function () {
            // this holds the element that we want and runs all jquery method instead of re-searching each element again and again
            var id = $(this).attr("id");
            // returns the value stored at id
            var schedule = localStorage.getItem(id);

            if (schedule !== null) {
                $(this).children(".schedule").val(schedule);
            }
        });
    }

    // call the function
    setPlanner();

    // grabbed saveBtn class from index.html and stored it inside of a variable
    var saveBtn = $(".saveBtn");

    // added an "event" to saveBtn variable that when clicke will store the data into local storage
    saveBtn.on("click", function () {
        // we refer to the parent element of $(this) with attr "id" and store it inside of a variable
        var time = $(this).parent().attr("id");
        // we refer to sibling element of $(this) with class "schedule" and store and access it's value
        var schedule = $(this).siblings(".schedule").val();

        // sets information inside of the local storage and updates it if it already exists
        localStorage.setItem(time, schedule);
    });

    // grabbed completeBtn class from index.html and stored in inside of a variable
    var completeBtn = $(".completeBtn");

    //  added an "event" to completeBtn variable that when clicked would clear data from local storage for that specific time slot
    completeBtn.on("click", function () {
        // this button doesn't work yet but working on it
        localStorage.removeItem(time, schedule);
    })

    // created a function whose main goal is to color code the schedule box based on current time
    function dayPlanner() {
        currentHour = time.hours();
        $(".time-block").each(function () {
            // stores the int value returned of attr "id"
            var scheduleHour = parseInt($(this).attr("id"));

            // if the hour is > than current hour 
            if (scheduleHour > currentHour) {
                // give it a class of future
                $(this).addClass("future")
            }

            // if the hours is === to current hour
            else if (scheduleHour === currentHour) {
                // give it a class of present
                $(this).addClass("present");
            }

            // else hour is past
            else {
                // give it a class of past
                $(this).addClass("past");
            }
        })
    }
    // call the function
    dayPlanner();

})