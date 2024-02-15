"use client";

import BackBtn from "@/components/BackBtn/BackBtn";

export default function Error() {
  return (
    <div>
      <BackBtn />
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          position: "relative",
          bottom: "-20px",
        }}
      >
        오류가 발생했습니다
      </h1>
    </div>
  );
}
