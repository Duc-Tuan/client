import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import PotentialChats from "../components/chat/PotentialChats";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import ChatBox from "../components/chat/ChatBox";

const Chat = (props) => {
  const { user } = useContext(AuthContext);
  const { userChats, isChatLoading, updateCurrentUser } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack
          direction="horizontal"
          gap={4}
          className="align-items-start"
          style={{ flexWrap: "wrap" }}
        >
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isChatLoading && <p>Loading chats...</p>}
            {userChats?.map((i, idx) => {
              return (
                <div key={idx} onClick={() => updateCurrentUser(i)}>
                  <UserChat chat={i} data={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
