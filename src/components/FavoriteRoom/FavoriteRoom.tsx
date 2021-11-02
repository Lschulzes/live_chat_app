import React, { ReactNode } from 'react';
import RoomCode from '../RoomCode/RoomCode';
import { FavoriteRoomDiv } from './FavoriteRoomDiv';

type FavRoomProps = {
  children?: ReactNode;
  code: string;
  title: string;
};

export default function FavoriteRoom({ code, title }: FavRoomProps) {
  return (
    <FavoriteRoomDiv>
      <RoomCode title={title} code={code} />
    </FavoriteRoomDiv>
  );
}
