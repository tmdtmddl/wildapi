"use client";

import { useEffect, useRef } from "react";

const Map = () => {
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.naver && mapRef.current) {
      const location = new naver.maps.LatLng(37.5666103, 126.9783882);
      const mapOptions = {
        // 지도의 초기 중심 좌표
        center: location,
        zoom: 14, // 지도의 초기 줌 레벨
      };
      new naver.maps.Map(mapRef.current, mapOptions);
    }
  }, []);

  return (
    <div>
      <div
        id="map"
        ref={mapRef}
        className="max-w-[1200px] mx-auto"
        style={{ width: "1143px", height: "594px" }}
      />
    </div>
  );
};

export default Map;
