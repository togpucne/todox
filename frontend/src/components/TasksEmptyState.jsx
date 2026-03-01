import { Circle } from "lucide-react";
import { Card } from "./ui/card";
import { options } from "@/lib/data";

const TasksEmptyState = ({ filter, dateFilter }) => {
  return (
    <>
      <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
        <div className="space-y-3 ">
          <Circle className="size-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="font-medium text-foreground">
              {
                filter === "active"
                  ? "Không có nhiệm vụ nào đang làm!"
                  : filter === "completed"
                  ? "Không có nhiệm vụ nào đã hoàn thành!"
                  : "Không có nhiệm vụ nào!"
              }
            </h3>
            <p className="text-sm text-muted-foreground">
              {dateFilter && dateFilter !== "all"
                ? `Không có nhiệm vụ trong khoảng "${options.find(o => o.value === dateFilter)?.label}"`
                : filter === "all"
                ? "Thêm nhiệm vụ để bắt đầu!"
                : `Chuyển sang "tất cả" để thấy nhiệm vụ khác ${
                    filter === "active" ? "đã hoàn thành" : "đang làm"
                  }`}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TasksEmptyState;
