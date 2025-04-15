import React, { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header></header>
      <main className="mt-20">{children}</main>
    </>
  );
};

export default AppLayout;
