/click event, this starts the whole process
    document.querySelector('#addbutton').addEventListener('click', function(){
    const inputName = document.querySelector('#nameInput').value;
    const inputDescription = document.querySelector('#descriptionInput').value;
    const inputAssignedTo = document.querySelector('#assignedInput').value;
    const inputDueDate = document.querySelector('#dateInput').value;
    const inputStatus = document.querySelector('#statusInput').value;


// validates all the input fields, checks each field is filled 
    function validateForm(inputName,inputDescription, inputAssignedTo, inputDueDate, inputStatus) 
    {let isAllValid = false;
        if((inputName.length >= 3) && (inputDescription.length >=10) && (inputAssignedTo.length >= 3) && (inputDueDate) && (inputStatus != 'Choose...')){
            isAllValid =true;
        }
    
        return isAllValid;  
    }
    
   //creates tasks if all the fields and filled correctly
    let allChecksPassed = validateForm(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus);
    if(allChecksPassed == true){
        createTaskObject(inputName, inputDescription, inputAssignedTo, inputDueDate, inputStatus, myTaskManager.allTasks);
        let taskIndex = myTaskManager.allTasks.length-1;
        console.log(myTaskManager.allTasks[taskIndex]);
        myTaskManager.addTask(myTaskManager.allTasks[taskIndex])
    }

    
})

// delete task
document.addEventListener('click', function(event){
    const isButton = (event.target.nodeName == 'BUTTON');
    if(isButton) {
        const element = event.target;
        myTaskManager.deleteTask(element);
    }  

})




//function validateForm(inputName,inputDescription, inputAssignedTo, inputDueDate, inputStatus) 
////{
    //let isAllValid = false;

   // if((inputName.length >= 3) && (inputDescription.length >=10) && (inputAssignedTo.length >= 3) && (inputDueDate) && (inputStatus != 'Choose...')){
       // isAllValid =true;
    //}

    //return isAllValid;  
//}

//creates obkects using all the input data
function createTaskObject(inputName, inputDescription ,inputAssignedTo, inputDueDate, inputStatus, myTaskArray){
    myTaskManager.allTasks.push({
       "Name": inputName,
       "Description": inputDescription,
       "AssignedTo": inputAssignedTo,
       "DueDate": inputDueDate,
       "Status": inputStatus,
       "ID": `${myTaskArray.length < 1 ? 1 : myTaskArray.length+1}`
    })


    localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
    return myTaskManager.allTasks ;
}



class TaskManager {
    constructor(name){
        this.allTasks = [];
        this.name = name;
    }

    getAllTasks(){
        console.log(this.allTasks);


    }


    addTask(taskObj){

    

         //adds a card template into the html along with the user inputs and unique ID 

        let cardHTML =   `<div class="col-md-4" taskID="${taskObj.ID}">
                        <div class="card cardStyle">
                            <div class="card-header">
                                Task
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Name: ${taskObj.Name} </li>
                                <li class="list-group-item">Description : ${taskObj.inputDescription} </li>
                                <li class="list-group-item">Assigned To: ${taskObj.AssignedTo} </li>
                                <li class="list-group-item">Due Date: ${taskObj.inputDueDate} </li>
                                <li class="list-group-item">Status: ${taskObj.Status} </li>
                            </ul>
                            <button type="button" class="btn btn-dark" job="delete" deleteID="${taskObj.ID}">Delete</button>
                        </div>
                    </div>`

        let cardsHTMLrow = document.querySelector('#cardSection');
        cardsHTMLrow.innerHTML += cardHTML;



        let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID="${taskObj.ID}">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Assigned To: ${taskObj.AssignedTo} </h5>
                            <small>Due Date: ${taskObj.DueD} </small>
                        </div>
                        <small>Status: ${taskObj.Status}</small>
                        </a>`

        let listHTMLrow = document.querySelector('#newTasksList');
        listHTMLrow.innerHTML += listHTML;      
        


    }
    // delete task 
    deleteTask(element){
    let thistaskID = element.parentNode.parentNode.attributes.taskID.value;
    for(let i=0; i < this.allTasks.length; i++){
        if(this.allTasks[i].ID == thistaskID){
           this.allTasks.splice(i,1);
            localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
        }
    }

    console.log(this.allTasks);

    //removes card 
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)

    //removes task
    let elementsA = document.querySelectorAll('a');
    for(let i=0; i < elementsA.length; i++){
        element = elementsA[i];
        if(element.attributes.taskID.value == thistaskID){
            element.parentNode.removeChild(element);
        }
    }

    
}

}

let myTaskManager = new TaskManager("TaskyMcTask");


//gets the data back from local storage
let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
    myTaskManager.allTasks = JSON.parse(dataReturned);
    populatePage(myTaskManager.allTasks)
} else {
    myTaskManager.taskArray = [];
}

//this function populates the page when the form is filled and the add button is clicked 
function populatePage(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }
}
