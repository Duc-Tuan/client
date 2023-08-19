import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import useFetchRecipient from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import { baseUrl, postRequest } from "../../utils/service";

const ChatBox = (props) => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    mess,
    isMessLoading,
    messError,
    error,
    newMessage,
    handleSendChat,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipient(currentChat, user);
  const [textMess, setTextMess] = React.useState("");

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );

  if (isMessLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {mess &&
          mess?.map((i, idx) => (
            <Stack
              key={idx}
              className={`${
                i?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{i?.text}</span>
              <span className="message-footer">{i?.createdAt}</span>
            </Stack>
          ))}
      </Stack>

      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMess}
          onChange={setTextMess}
          cleanOnEnter
          //   onEnter={handleOnEnter}
          placeholder="Type a message"
        />

        <button
          className="send-btn"
          onClick={() =>
            handleSendChat(textMess, user, currentChat?._id, setTextMess)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
