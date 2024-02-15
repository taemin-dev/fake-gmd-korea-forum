import BackBtn from "@/components/BackBtn/BackBtn";

export const metadata = {
  title: "404",
};

export default function NotFound() {
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
        페이지를 찾을 수 없습니다
      </h1>
    </div>
  );
}
