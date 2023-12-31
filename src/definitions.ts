export type user = {
  user_id: number,
  username: string,
  email: string,
  password_hash: string
};

export type posts = {
  user_id: number,
  post_id: number,
  p_title: string,
  p_query: string | undefined,
  p_time_posted: string,
  p_upvotes: number,
  category: "physics" | "mathematics" | "history" | undefined
}

export type comments = {
  comment_id: number,
  post_id: number,
  c_query: string,
  c_time_posted: Date,
  c_upvotes: number,
}

export type saved_posts = {
  user_id: number,
  post_id: number
}