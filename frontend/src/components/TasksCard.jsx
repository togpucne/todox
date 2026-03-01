import React, { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import {
  Circle,
  SquarePen,
  Trash2,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const TasksCard = ({ task, index, handleTasksChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const deleteTasks = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success("Đã xóa công việc thành công!");
      handleTasksChange && handleTasksChange();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Đã xảy ra lỗi khi xóa công việc. Vui lòng thử lại sau.");
    }
  };

  const toggleTasksCompletedButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(
          `Công việc "${task.title}" đã được đánh dấu là hoàn thành!`,
        );
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(
          `Công việc "${task.title}" đã được đánh dấu là chưa hoàn thành!`,
        );
      }
      handleTasksChange && handleTasksChange();
    } catch (error) {
      console.error("Error toggling task status:", error);
      toast.error(
        "Đã xảy ra lỗi khi cập nhật trạng thái công việc. Vui lòng thử lại sau.",
      );
    }
  };
  return (
    <>
      <Card
        className={cn(
          "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
          task.status === "completed" && "opacity-70",
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center gap-4">
          {/* Nut  */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTasksCompletedButton}
            className={cn(
              "flex-shrink-0 size-8 rounded-full transition-all duration-200",
              task.status === "completed"
                ? "text-success hover:text-success/80"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className="size-5" />
            )}
          </Button>
          {/* Tieu de */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Cần làm việc gì?"
                className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            ) : (
              <p
                className={cn(
                  "text-base transition-all duration-200",
                  task.status === "completed"
                    ? "line-through text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {task.title}
              </p>
            )}
            {/* Ngay tao */}
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
              {task.completedAt && (
                <>
                  <span className="text-xs text-muted-foreground">-</span>
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.completedAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Nut chinh va  xoa */}
          <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
            {/* Nut edit / save */}
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
              onClick={async () => {
                if (isEditing) {
                  // save
                  try {
                    await api.put(`/tasks/${task._id}`, { title: editedTitle });
                    toast.success("Cập nhật công việc thành công");
                    handleTasksChange && handleTasksChange();
                  } catch (error) {
                    console.error("Error updating task:", error);
                    toast.error(
                      "Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại sau.",
                    );
                  }
                }
                setIsEditing((v) => !v);
              }}
            >
              {isEditing ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <SquarePen className="size-5" />
              )}
            </Button>

            {/* Nut delete */}
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
              onClick={deleteTasks}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TasksCard;
