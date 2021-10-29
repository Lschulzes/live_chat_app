import copyImg from '../../assets/images/copy.svg';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { UIActions } from '../../store/slices/UI/UISlice';
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
    width: 15rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

type RoomCodeType = {
  code: string;
};

export default function RoomCode({ code: roomCode }: RoomCodeType) {
  const dispatch = useDispatch();
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    dispatch(UIActions.setSuccess({ msg: 'Copied to Clipboard!' }));
  };

  return (
    <RoomCodeButton className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt='Copy room code' />
      </div>
      <span>Room #{roomCode}</span>
    </RoomCodeButton>
  );
}
