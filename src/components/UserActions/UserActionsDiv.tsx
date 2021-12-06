import styled from 'styled-components';
export const UserActionsDiv = styled.div`
  padding: 0 1rem 1rem 0;
  display: flex;
  align-items: center;
  .pic {
    width: 45px;
    border-radius: 45px;
    transition: all 0.4s;
    z-index: 2;
    cursor: pointer;
  }

  .plus {
    position: absolute;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    font-size: larger;
    z-index: 1;
    background: ${({ theme }) => theme.primary.color};
    color: ${({ theme }) => theme.primary.bg};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle-theme {
    transform: scale(0);
    position: absolute;
    transition: all 400ms;
    margin-left: -1.5rem;
  }

  .logout {
    margin-left: -2rem;
    transition: all 0.3s;
  }

  .username {
    margin-left: 1rem;
    color: ${({ theme }) => theme.secondary.color};
    transition: all 400ms;
  }

  &:hover {
    .pic {
      opacity: 0.2;
    }
    .logout {
      margin-left: 1rem;
    }

    .username {
      opacity: 0;
    }

    .toggle-theme {
      transform: scale(0.85) translateY(3rem);
      position: absolute;
    }
  }

  @media (max-width: 768px) {
    .username {
      color: ${({ theme }) => theme.primary.color};
    }
  }
`;
