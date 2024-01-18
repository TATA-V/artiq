import { Select, SelectItem } from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

function AuctionSelect({ category = '', setCategory } : Props) {
  const categoryArr = [
    { id: 1, value: '그림' },
    { id: 2, value: '음악' },
    { id: 3, value: '패션/주얼리' },
    { id: 4, value: '공예' },
    { id: 5, value: '뷰티' },
    { id: 6, value: '식품' },
  ];

  return (
    <Select
      label="카테고리 선택"
      className="max-w-[12rem]"
      variant="bordered"
      onChange={(e) => setCategory(e.target.value)}
      selectedKeys={category !== '' ? [category] : undefined}
    >
      {categoryArr.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.value}
        </SelectItem>
      ))}
    </Select>
  );
}

export default AuctionSelect;
