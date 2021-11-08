import copyImg from '../../assets/images/copy.svg';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { UIActions } from '../../store/slices/UI/UISlice';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { toggleRoom } from '../../store/slices/auth/actions';
import { RoomCodeButton } from './RoomCodeButton';

type RoomCodeType = {
  code: string;
  title?: string;
};

export default function RoomCode({ code: roomCode, title }: RoomCodeType) {
  const authState = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);
  const favorite_rooms = user?.favorite_rooms ?? {};
  const dispatch = useDispatch();
  const history = useHistory();
  const [isFavoriteRoom, setIsFavoriteRoom] = useState(false);
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    dispatch(UIActions.setSuccess({ msg: 'Copied to Clipboard!' }));
  };
  const redirectToRoom = () => history.push(`/room/${roomCode}`);

  useEffect(() => {
    if (typeof user?.favorite_rooms === 'undefined') return;
    setIsFavoriteRoom(roomCode in user?.favorite_rooms ?? false);
  }, [favorite_rooms, setIsFavoriteRoom]);
  return (
    <RoomCodeButton className='room-code'>
      <div onClick={copyRoomCodeToClipboard}>
        <img src={copyImg} alt='Copy room code' />
      </div>
      <span onClick={title ? redirectToRoom : copyRoomCodeToClipboard}>
        {title ? title : 'Room #' + roomCode}
      </span>
      {authState.isLoggedIn && (
        <div
          onClick={() =>
            dispatch(
              toggleRoom(authState, {
                payload: roomCode,
                type: 'favorite_rooms',
              })
            )
          }
        >
          {isFavoriteRoom ? (
            <BsBookmarkStarFill className='fav' />
          ) : (
            <BsBookmarkStar className='fav' />
          )}
        </div>
      )}
    </RoomCodeButton>
  );
}
