import { Stack } from "react-bootstrap";
import useFetchRecipient from "../../hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

function UserChat({ chat, data }) {
  const { recipientUser } = useFetchRecipient(chat, data);
  const { onlineUsers } = useContext(ChatContext);
  const isOnlien = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );
  // console.log(recipientUser);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
    >
      <div className="d-flex">
        <div className="me-2">A</div>
        <div className="text-contetn">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Mess</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">26/03/2002</div>
        <div className="this-user-notifications">2</div>
        <span className={isOnlien ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
}

export default UserChat;
