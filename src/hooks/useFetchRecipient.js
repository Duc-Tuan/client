import React from "react";
import { baseUrl, getRequest } from "../utils/service";

const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  const recipientId = chat?.member.find((id) => id !== user?._id);

  React.useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const res = await getRequest(`${baseUrl}/api/users/find/${recipientId}`);

      if (res.error) {
        return setError(res);
      }
      setRecipientUser(res);
    };
    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};

export default useFetchRecipient;
