'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { usePostService } from 'src/services/usePostService';

interface Props {
  postId: number;
}

function DeleteButton({ postId }: Props) {
  const { deleteOne } = usePostService();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteOne(postId);
    router.back();
  };

  return (
    <Button onClick={handleDelete} size="sm" color="danger">
      삭제
    </Button>
  );
}

export default DeleteButton;
