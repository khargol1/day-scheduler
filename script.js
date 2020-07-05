var times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
var taskList = []

//Display current day and time top of page
var currentTime = moment().format("dddd MMMM Do hh:mm");
$("#currentDay").html(currentTime);

$('button').on('click', function(event){
    //console.log(this);
    let temp = "";
    for(var i = 0; i < times.length; i++){
        //console.log($('#area'+i).html());
        temp = $('#area'+i).val().trim();
        taskList[i] = temp;
    }
    localStorage.setItem('tasks', JSON.stringify(taskList));
});

//Assigns colors and makes past read only
function colorCode() {

    let breakpoint = false;
    let time = ""
    let start = "";
    let end = moment();

    for (var i = 0; i < times.length; i++) {
        time = times[i];
        start = moment(time, 'h:mm');

        if(end.isBefore(start)){
            //colors red first then green after
            if(breakpoint == false){
                $("#area" + i).addClass("present");
                breakpoint = true;
            }else{$("#area" + i).addClass("future");} 
        }else{
            //colors grey
            $("#area" + i).addClass("past");
            $('#area' + i).prop('readonly', true);
        }   
    }
}


function onLoad(){
    //check to see if we have stored tasks

    if('tasks' in localStorage){
        taskList = JSON.parse(localStorage.getItem('tasks'));   
        for(var i = 0; i < times.length; i++){
            $('#area'+i).val(taskList[i]);     
        }
    }
    else{ //its not 
        //do nothing, nailed it
    }

    colorCode();
}

onLoad();
