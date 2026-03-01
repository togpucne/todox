import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
const TasksListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPage,
}) => {
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) handlePrev();
                }}
                className={cn("cursor-pointer", page === 1 && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            {pages.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    if (p !== page) handlePageChange(p);
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPage) handleNext();
                }}
                className={cn("cursor-pointer", page === totalPage && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default TasksListPagination;
