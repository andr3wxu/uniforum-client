export type user = {
  user_id: number,
  username: string,
  email: string,
  password_hash: string
};

export type posts = {
  user_id: number,
  post_id: number,
  p_query: string,
  // p_time_posted: ?? DATE??
  p_upvotes: number,
  category: "" | undefined
}

export type comments = {
  comment_id: number,
  post_id: number,
  c_query: string,
  // c_time_posted: ?? DATE??
  c_upvotes: number,
}

export type saved_posts = {
  user_id: number,
  post_id: number
}