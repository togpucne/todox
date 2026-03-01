import AddTasks from "@/components/AddTasks";
import DateTimeFilters from "@/components/DateTimeFilters";
import TasksList from "@/components/TasksList";
import TasksListPagination from "@/components/TasksListPagination";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const HomePage = () => {
  const [tasksBuffer, setTasksBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  // pagination (client-side, 4 items per page)
  const [page, setPage] = useState(1);
  const limit = 4;
  // removed unused dateQuery
  const [dateQueryTasks, setDateQueryTasks] = useState("all");
  
  // logic
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasksBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeTasksCount);
      setCompletedTasksCount(res.data.completedTasksCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Đã xảy ra lỗi khi tải nhiệm vụ. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [filter, dateQueryTasks]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  // apply status + date filters
  const filterTasks = tasksBuffer.filter((task) => {
    // status
    let statusOk;
    switch (filter) {
      case "active":
        statusOk = task.status === "active";
        break;
      case "completed":
        statusOk = task.status === "completed";
        break;
      default:
        statusOk = true;
    }
    if (!statusOk) return false;

    // date range
    if (dateQueryTasks && dateQueryTasks !== "all") {
      const created = new Date(task.createdAt);
      const now = new Date();
      if (dateQueryTasks === "today") {
        if (created.toDateString() !== now.toDateString()) return false;
      } else if (dateQueryTasks === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        if (created < weekAgo) return false;
      } else if (dateQueryTasks === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        if (created < monthAgo) return false;
      }
    }

    return true;
  });
  // compute counts for footer (server returns overall counts)
  const footerActiveCount = activeTasksCount;
  const footerCompletedCount = completedTasksCount;

  // pagination calculations based on filtered tasks
  const totalPage = Math.ceil(filterTasks.length / limit);
  const visibleTasks = filterTasks.slice((page - 1) * limit, page * limit);

  // handleTasksChange
  // if `resetFilters` is true we reset status/date filters (used when adding a new task)
  const handleTasksChange = (resetFilters = false) => {
    if (resetFilters) {
      setFilter("all");
      setDateQueryTasks("all");
      setPage(1);
      fetchTasks();
    } else {
      fetchTasks();
    }
  };


  return (
    <>
      <div className="min-h-screen w-full bg-[#fefcff] relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
          }}
        />

        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            <Header />
            <AddTasks handleNewTasksAdded={handleTasksChange} />
            <StatsAndFilters
              filter={filter}
              setFilter={setFilter}
              activeTasksCount={footerActiveCount}
              completedTasksCount={footerCompletedCount}
            />
            <TasksList
              filterTasks={visibleTasks}
              filter={filter}
              handleTasksChange={handleTasksChange}
              dateFilter={dateQueryTasks}
            />
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TasksListPagination  handleNext={handleNext} handlePrev={handlePrev} handlePageChange={handlePageChange} page={page} totalPage={totalPage}/>
              <DateTimeFilters dateQueryTasks={dateQueryTasks} setDateQueryTasks={setDateQueryTasks} />
            </div>
            <Footer
              activeTasksCount={footerActiveCount}
              completedTasksCount={footerCompletedCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
