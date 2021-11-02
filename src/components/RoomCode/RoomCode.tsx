import copyImg from '../../assets/images/copy.svg';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { UIActions } from '../../store/slices/UI/UISlice';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { toggleFavoriteRoom } from '../../store/slices/auth/actions';
const RoomCodeButton = styled.button`
  height: 2.5rem;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: stretch;

  background: ${({ theme }) => theme.primary.bg_light};
  color: ${({ theme }) => theme.primary.color};

  ${(props) => 'border: 1px solid ' + props.theme.primary.item_color + ';'}
  cursor: pointer;

  div {
    background: ${({ theme }) => theme.primary.item_color};
    padding: 0 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 1rem 0 0.75rem;
    /* width: 10rem; */
    width: 9rem;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .fav {
    color: #fff;
    font-size: larger;
  }
  .fav.active {
    color: #fff;
  }

  @media (max-width: 600px) {
    span {
      padding: 0;
      width: 7rem;
    }
  }
`;

type RoomCodeType = {
  code: string;
};

export default function RoomCode({ code: roomCode }: RoomCodeType) {
  const authState = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);
  const favorite_rooms = user?.favorite_rooms ?? [];
  const dispatch = useDispatch();
  const [isFavoriteRoom, setIsFavoriteRoom] = useState(false);
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    dispatch(UIActions.setSuccess({ msg: 'Copied to Clipboard!' }));
  };

  useEffect(() => {
    setIsFavoriteRoom(favorite_rooms?.includes(roomCode) ?? false);
  }, [favorite_rooms]);
  return (
    <RoomCodeButton className='room-code'>
      <div onClick={copyRoomCodeToClipboard}>
        <img src={copyImg} alt='Copy room code' />
      </div>
      <span onClick={copyRoomCodeToClipboard}>Room #{roomCode}</span>
      {authState.isLoggedIn && (
        <div
          onClick={() =>
            dispatch(
              toggleFavoriteRoom(authState, { payload: roomCode, type: '' })
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
