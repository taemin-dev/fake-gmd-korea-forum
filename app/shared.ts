export const API_URL = "https://gmdkoreaforum.com/api";

export interface ILevel {
  level_id: number;
  level_name: string;
  level_rank: number;
  pointercrate_rank: number;
  is_legacy: boolean;
  require_percent: number;
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
  video_url: string;
  category: string;
  rate_point: number;
  rate_users: number;
  score: number;
}

export function getVideoId(full_url: string) {
  return full_url.includes("youtu.be")
    ? full_url.slice(17, 28)
    : full_url.slice(-11);
}
