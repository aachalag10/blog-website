export async function getAllBlogs() {
  const res = await fetch(`http://127.0.0.1:8000/blog/`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function postBlogs(data: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/blog`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to post data");
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getBlogs(userid: number) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/blog/user/${userid}`, {
      method: "GET",
      headers: {
        "content-type": "application-json",
      },
    });
    if (!res.ok) {
      throw new Error("failed to post data");
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(id: number) {
  try {
    const user = await fetch(`http://127.0.0.1:8000/user/me/${id}`, {
      method: "GET",
    });
    if (!user.ok) {
      throw new Error("Failed to fetch user");
    }
    const result = await user.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getoneBlog(id: number) {
  try {
    const blog = await fetch(`http://127.0.0.1:8000/blog/${id}`, {
      method: "GET",
    });
    if (!blog.ok) {
      throw new Error("failed to fetch blog");
    }
    const result = await blog.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
