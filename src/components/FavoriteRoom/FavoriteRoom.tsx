import React, { ReactNode } from 'react';
import { FavoriteRoomDiv } from './FavoriteRoomDiv';

type FavRoomProps = {
  children?: ReactNode;
  code: string;
  title: string;
};

export default function FavoriteRoom({ code }: FavRoomProps) {
  return (
    <FavoriteRoomDiv>
      <h1>{code}</h1>
    </FavoriteRoomDiv>
  );
}
