import { toast } from "sonner";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import api from "@/lib/axios";

const AddTasks = ({ handleNewTasksAdded }) => {
  const [newTask, setNewTask] = useState("");
  const addTasks = async () => {
    if (newTask.trim()) {
      try {
          await api.post("/tasks", { title: newTask });
        toast.success(`Đã thêm công việc: ${newTask} thành công!`);
          // ask parent to refresh and reset filters so the new item is visible
          handleNewTasksAdded && handleNewTasksAdded(true);
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Đã xảy ra lỗi khi thêm công việc. Vui lòng thử lại sau.");
      }
      setNewTask("");
    } else {
      toast.error("Vui lòng nhập tên công việc trước khi thêm.");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTasks();
    }
  };

  return (
    <>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            placeholder="Thêm công việc mới..."
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button variant="gradient" size="xl" onClick={addTasks}
          disabled={!newTask.trim()}
          >
            + Thêm 
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddTasks;
