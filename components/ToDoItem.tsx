class ToDoItem{
    title: string;
    description: string;
    CreatedDate: Date;
    DueDate: Date;
    Priority: string;
    Status: string;
    
    constructor(title: string, description: string, CreatedDate: Date, DueDate: Date, Priority: string, Status: string){
        this.title = title;
        this.description = description;
        this.CreatedDate = CreatedDate;
        this.DueDate = DueDate;
        this.Priority = Priority;
        this.Status = Status;
    }
    updateStatus(newStatus: string){
        this.Status = newStatus;
    }
    updateDueDate(newDueDate: Date){
        this.DueDate = newDueDate;
    }
    updatePriority(newPriority: string){
        this.Priority = newPriority;
    }
    updateDescription(newDescription: string){
        this.description = newDescription;
    }
    updateTitle(newTitle: string){
        this.title = newTitle;
    }
    get getTitle(){
        return this.title;
    }
    get getDescription(){
        return this.description;
    }
    get getCreatedDate(){
        return this.CreatedDate;
    }
    get getDueDate(){
        return this.DueDate;
    }
    get getPriority(){
        return this.Priority;
    }
    get getStatus(){
        return this.Status;
    }

}

export default ToDoItem;