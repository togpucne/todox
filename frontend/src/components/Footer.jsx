const Footer = ({ completedTasksCount , activeTasksCount  }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            {completedTasksCount > 0 &&
              " 🎉 Tuyệt vời! Bạn đã hoàn thành " +
                completedTasksCount +
                " nhiệm vụ" +
                ((activeTasksCount > 0 &&
                  ", còn " +
                    activeTasksCount +
                    " nữa thôi. 💪") ||
                  "")}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                Hãy bắt đầu làm việc với {activeTasksCount} nhiệm vụ đang chờ bạn hoàn thành! 🚀
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
