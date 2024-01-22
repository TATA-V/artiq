'use client';

import { Button } from '@nextui-org/react';

interface Props {
  postId: number;
}

function ChatButton({ postId } : Props) {
  const handleClickChat = () => {
    // socket.emit('create_chat', [user.id, post.userId]);
  };

  return (
    <Button onClick={handleClickChat} className="mt-8" color="primary" variant="bordered">
      채팅하기
    </Button>
  );
}

export default ChatButton;
