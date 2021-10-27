import { useContext } from 'react';
import ReactSwitch from 'react-switch';
import styled from 'styled-components';
import AuthContext from '../../contexts/authContext';
import useCustomTheme from '../../hooks/useCustomTheme';

const ToggleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
type ToggleThemeType = {
  toggleTheme: () => void;
};

export default function ToggleTheme() {
  const { theme, toggleTheme } = useContext(AuthContext);

  return (
    <ToggleDiv className='toggle-theme'>
      🌞
      <ReactSwitch
        checked={theme.title === 'dark'}
        onChange={toggleTheme}
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
