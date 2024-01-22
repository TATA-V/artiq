import { Card, CardHeader, CardBody, Image, Link } from '@nextui-org/react';
import { IPost } from 'src/types/postType';

async function AuctionCards() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/posts`, {
    method: 'GET',
    next: { revalidate: 300 },
  });
  const posts : IPost[] = await res.json();

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-wrap gap-3 max-w-[956px] justify-start">
        {posts.map((item) => (
          <Link key={item.id} href={`auction/post/${item.id}`}>
            <Card className="py-1 w-[230px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-[0.9rem] font-bold">{item.category}</p>
                <small className="text-default-500 truncate w-full">{item.author}</small>
                <h4 className="font-bold text-base h-[44.8px] leading-[1.4rem] line-clamp-2">{item.title}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={item.imgUrl}
                  width="100%"
                />
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AuctionCards;
