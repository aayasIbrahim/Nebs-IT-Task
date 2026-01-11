import React from "react";
import InteractiveNoticeTable from "@/components/NoticeTable";
import NoticeHeader from "@/components/NoticeHeader";

function page() {
  return (
    <>
      <NoticeHeader />
      <InteractiveNoticeTable />
    </>
  );
}

export default page;