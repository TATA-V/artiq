'use client';

import { useEffect, useState } from 'react';

export default function Main() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/posts', {
        method: 'GET',
        next: { revalidate: 300 },
      });
      const data = await res.json();
      setPosts(data);
      return data;
    };
    fetchData();
  }, []);

  console.log('posts:', posts);

  return (
    <div>
      Main Page
    </div>
  );
}
