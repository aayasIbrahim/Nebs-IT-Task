import React from "react";

import NotieBorad from "./notice-board/page";
import { NoticeSearchParams } from "../types/notice";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<NoticeSearchParams>;
}) {
  return (
    <>
      <NotieBorad searchParams={searchParams} />
    </>
  );
}
