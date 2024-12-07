// import { validationReqRegest } from "@/auth";

import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // await validationReqRegest();
  return <div>{children}</div>;
};

export default layout;
