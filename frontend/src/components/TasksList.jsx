import TasksCard from "./TasksCard";
import TasksEmptyState from "./TasksEmptyState";

const TasksList = ( {filterTasks, filter, handleTasksChange, dateFilter}) => {
  
  if (!filterTasks || filterTasks.length === 0) {
    return <TasksEmptyState filter={filter} dateFilter={dateFilter} />;
  }

  return (
    <>
      <div className="space-y-3 ">
        {filterTasks.map((task, index) => (
          <TasksCard key={task._id ?? index} task={task} index={index} 
          handleTasksChange={handleTasksChange}
          />
        ))}
      </div>
    </>
  );
};

export default TasksList;
