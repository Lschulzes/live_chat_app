import { useDispatch, useSelector } from 'react-redux';
import ReactSwitch from 'react-switch';
import styled from 'styled-components';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/slices/theme';

const ToggleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function ToggleTheme() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <ToggleDiv className='toggle-theme'>
      🌞
      <ReactSwitch
        checked={theme.title === 'dark'}
        onChange={() => dispatch(toggleTheme())}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={30}
        handleDiameter={17}
        onColor={theme.secondary.color}
        offColor={theme.primary.color}
        onHandleColor='#eee'
        offHandleColor='#eee'
        boxShadow='-2px 0 5px #000'
      />
      🌑
    </ToggleDiv>
  );
}
