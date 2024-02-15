import { API_URL, getVideoId } from "@/app/shared";
import styles from "./Detail.module.css";
import BackBtn from "@/components/BackBtn/BackBtn";
import BgImage from "@/components/BgImage/BgImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faMedal } from "@fortawesome/free-solid-svg-icons";

interface ILevelDetail {
  level_id: number;
  level_rank: number;
  pointercrate_rank?: number;
  is_legacy: boolean;
  level_name: string;
  publisher: {
    user_id: number;
    nickname: string;
    is_korean: boolean;
  };
  creators: [
    {
      user_id: number;
      nickname: string;
      is_korean: boolean;
    }
  ];
  verifier: {
    user_id: number;
    nickname: string;
    is_korean: boolean;
  };
  is_hacked: number;
  require_percent: number;
  video_url: string;
  ingame_level_id?: number;
  ingame_length?: number;
  highest_rank: number;
  upload_date?: string;
  ingame_password?: number;
  ingame_objects?: number;
  ingame_difficulty?: number;
  ingame_song_id?: number;
  category: string;
  rate_point: number;
  rate_users: number;
  warn_message: string;
  score: number;
  records: [
    {
      user: {
        user_id: number;
        nickname: string;
        is_korean: boolean;
      };
      percent: number;
      video_url: string;
      device_type: "PC" | "iPad" | "Mobile";
      device_fps: number;
      is_fps_bypass: boolean;
      score: number;
    }
  ];
  comments: [
    {
      context: string;
      upload_date: number;
      user: {
        user_id: number;
        nickname: string;
        is_korean: boolean;
      };
    }
  ];
}

export async function generateMetadata({
  params: { rank },
}: {
  params: { rank: string };
}) {
  const { level_name }: ILevelDetail = await getLevelDetail(rank);
  return { title: `#${rank} - ${level_name}` };
}

async function getLevelDetail(rank: string) {
  const response = await fetch(
    `${API_URL}/demonlist/levels/${rank}?find_by=rank`
  );
  const json = await response.json();
  return json.status === "success" ? json.data : [];
}

export default async function Detail({
  params: { rank },
}: {
  params: { rank: string };
}) {
  const level: ILevelDetail = await getLevelDetail(rank);
  const formatTime = (second: number) =>
    `${
      second / 60 < 10 ? `0${Math.floor(second / 60)}` : Math.floor(second / 60)
    }:${second % 60 < 10 ? `0${Math.floor(second % 60)}` : second % 60}`;
  const videoId = getVideoId(level.video_url);
  return (
    <div className={styles.container}>
      <BackBtn />
      <h1>{`#${level.level_rank}. ${level.level_name}`}</h1>
      <h3>{`by ${level.creators[0].nickname}${
        level.creators.length > 1 ? " and more" : ""
      }, Published by ${level.publisher.nickname}, Verified by ${
        level.verifier.nickname
      }`}</h3>
      <hr className={styles.videoHr} />
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <hr className={styles.videoHr} />
      <div className={styles.info}>
        <FontAwesomeIcon icon={faCircleInfo} />
        <span>레벨 정보</span>
        <hr />
        <div className={styles.grid}>
          {[
            { key: "레벨 ID", value: level.ingame_level_id || "데이터 없음" },
            {
              key: "레벨 길이",
              value: level.ingame_length
                ? formatTime(level.ingame_length)
                : "데이터 없음",
            },
            { key: "100% 유저포인트", value: `${level.score} UP` },
            {
              key: "인게임 난이도",
              value:
                level.ingame_difficulty === 6
                  ? "Extreme Demon"
                  : level.ingame_difficulty === 5
                  ? "Insane Demon"
                  : "데이터 없음",
            },
            {
              key: "최고 순위",
              value: `${level.highest_rank}위`,
            },
            {
              key: "오브젝트 수",
              value: level.ingame_objects || "데이터 없음",
            },
            {
              key: "레벨 업로드 일자",
              value: level.upload_date || "데이터 없음",
            },
            {
              key: "Copy 비밀번호",
              value:
                level.ingame_password == undefined
                  ? "데이터 없음"
                  : level.ingame_password === 0
                  ? "Copy 불가능"
                  : level.ingame_password === 1
                  ? "Free Copy"
                  : level.ingame_password,
            },
            {
              key: "Pointercrate 순위",
              value: `#${level.pointercrate_rank}` || "데이터 없음",
            },
            {
              key: "노래 Newgrounds ID",
              value: level.ingame_song_id
                ? level.ingame_song_id > 0
                  ? level.ingame_song_id
                  : "공식맵 노래"
                : "데이터 없음",
            },
          ].map((info) => (
            <div key={info.key}>
              <span>{info.key}</span> :{" "}
              <span className={styles.infoValue}>{info.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.records}>
        <h5>
          <FontAwesomeIcon icon={faMedal} />
          <span>기록</span>
        </h5>
        {level.records.length < 1 ? (
          <h5>아직 기록이 없습니다!{`\n`}가장 먼저 기록을 세워보세요!</h5>
        ) : null}
        <div className={styles.grid}>
          <ul>
            {level.records.map((record) => (
              <div
                key={record.user.user_id}
                className={record.percent < 100 ? styles.notCleared : ""}
              >
                <span>{record.user.nickname}</span>
              </div>
            ))}
          </ul>
          <ul>
            {level.records.map((record) => (
              <div
                key={record.user.user_id}
                className={record.percent < 100 ? styles.notCleared : ""}
              >
                <span>{record.percent}%</span>
              </div>
            ))}
          </ul>
          <ul>
            {level.records.map((record) => (
              <div
                key={record.user.user_id}
                className={record.percent < 100 ? styles.notCleared : ""}
              >
                <span>
                  {record.device_type === "Mobile"
                    ? "Mobile - "
                    : record.device_type === "iPad"
                    ? "iPad - "
                    : ""}
                  {record.device_fps} FPS
                  {record.is_fps_bypass ? "*" : ""}
                </span>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <BgImage video_id={videoId} />
    </div>
  );
}
