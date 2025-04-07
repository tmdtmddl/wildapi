"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import WildItemPage from "../wildItem/page";
import RootLoading from "@/app/loading";
import Pagination from "react-js-pagination";
import { FaCaretUp } from "react-icons/fa";
import "./pagination.css";

export interface WildProps {
  capt_de: string;
  capt_plce_adrs: string;
  data_stdr_de: string;
  rward_pymt_amnt: number;
  rward_pymt_de: string;
  sn: number;
  wdbr_co: number;
  wtdr_co: number;
}

const WildHomePage = () => {
  const [wilds, setWilds] = useState<WildProps[]>([]);

  const [page, setPage] = useState<number>(1); //현재 페이지 번호
  const postPerPage = 6; //페이지당 게시글 개수
  const indexOfLastPost = page * postPerPage; //마지막 인덱스
  const indexOfFirstPost = indexOfLastPost - postPerPage; //처음인덱스
  const wildLength = wilds.length;

  const MoveToTop = () => {
    // top:0 => 맨위로  behavior:smooth => 부드럽게 이동할수 있게 설정하는 속성

    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePageChange = (page: number) => {
    setPage(page);
    //버튼을 클릭하면 맨위로 이동
    return MoveToTop();
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fetchWilds = useCallback(() => {
    startTransition(async () => {
      const res = await fetch(`/api/v1/wild`, {
        method: "POST",
        body: JSON.stringify(wilds),
      });

      const data = await res.json();
      console.log(data);
      setWilds(data.items ?? []);
    });
  }, []);

  useEffect(() => {
    fetchWilds();
  }, [fetchWilds]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    //window에 이벤트를 추가해줄건데 추가해줄 이벤트는 스크롤이고 실행할함수는 handleSroll임
    window.addEventListener("scroll", handleScroll);

    return () => {
      //제거도 해줘야됨
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-2.5">
      {isPending && <RootLoading />}

      {wilds.length > 0 ? (
        <>
          <div className="mt-2.5  mx-auto">
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {/* 맵을 slice를 이용해서 현재 페이지에나올것만 보여주기 */}
              {wilds.slice(indexOfFirstPost, indexOfLastPost).map((wild) => (
                <li
                  key={wild.sn}
                  className="border-3 border-gray-400 bg-lime-50 rounded hover:border-green-800 hover:shadow-xl"
                >
                  <WildItemPage {...wild} />
                </li>
              ))}
            </ul>
          </div>
          <Pagination
            activePage={page} //현재페이지
            itemsCountPerPage={postPerPage} //한페이지랑 보여줄 아이템 갯수
            totalItemsCount={wildLength} //총 아이템갯수
            pageRangeDisplayed={5} //paginator의 페이지 범위
            prevPageText={"<"} //이전을 나타낼 텍스트
            nextPageText={">"} //다음을 나타낼 텍스트
            onChange={handlePageChange} //페이지변경을 핸들링하는 함수
            //Pagination 컴포넌트는 사용자가 페이지 번호를 클릭할 때마다, 그 클릭된 페이지 번호를 onChange 핸들러 함수에 인수로 전달합니다.
          />
        </>
      ) : (
        <div className="max-w-200 mx-auto mt-20">
          <p className="text-4xl">
            데이터를 불러오는 중이거나 정보가 없습니다.
          </p>
        </div>
      )}

      {isScrolled && (
        <div
          className="fixed border right-3 bottom-20 p-1 bg-lime-200 rounded-xl border-lime-500"
          onClick={() => MoveToTop()}
        >
          <FaCaretUp className="text-xl text-green-950" />
        </div>
      )}
    </div>
  );
};

export default WildHomePage;
