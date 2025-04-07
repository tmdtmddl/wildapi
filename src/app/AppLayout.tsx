import Link from "next/link";
import React, { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="fixed top-0 left-0 z-40 w-full bg-lime-600 border-b-2 border-green-700">
        <Link href="/wild/wId">
          <div className=" p-2.5 flex flex-col items-center shadow-xl">
            <p className="font-bold text-xl ">대전광역시 서구</p>
            <p className="font-bold text-xl">유해야생동물 포획 현황</p>
          </div>
        </Link>
      </header>
      <main className="mt-20">{children}</main>
    </>
  );
};

export default AppLayout;
