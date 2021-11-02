import styled from 'styled-components';
export const RoomCodeButton = styled.button`
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
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 1rem 0 0.75rem;
    height: 100%;
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
      padding: 0.5rem;
      /* width: 7rem; */
    }
  }
`;
