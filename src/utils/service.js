export const baseUrl = "http://localhost:3036";

export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    let mess;
    if (data.message) {
      mess = data.message;
    } else {
      mess = data;
    }

    return { error: true, mess };
  }
  return data;
};

export const getRequest = async (url, body) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    let mess;
    if (data.message) {
      mess = data.message;
    } else {
      mess = data;
    }

    return { error: true, mess };
  }
  return data;
};
