import styled from 'styled-components';
export const UserStyles = styled.div`
  header {
    padding: 1.5rem;

    ${(props) =>
      'border-bottom: 1px solid' +
      (props.theme.title === 'light' ? '#e2e2e2' : '#666')};

    .content {
      max-width: 70rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        max-height: 3rem;
        cursor: pointer;
      }

      .username {
        color: ${({ theme }) => theme.primary.color}!important;
      }
    }
  }

  #user-profile {
    max-width: 70rem;
    margin: 0 auto;
    display: flex;

    aside {
      padding: 1.5rem 0.5rem;
      flex: 1;
      min-width: 10rem;
      ul {
        list-style: none;

        a {
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          text-align: center;
          color: ${({ theme }) => theme.primary.color};
          text-decoration: none;
          li {
            border-radius: 8px;
            padding: 0.75rem;
          }
        }
        li:hover {
          background: ${({ theme }) => theme.primary.bg_darker};
        }
        a.active {
          li {
            background: ${({ theme }) => theme.primary.bg_darker};
          }
        }
      }
    }

    main {
      padding: 1.5rem 2rem;
      flex: 5;

      .general-settings {
        h2 {
          font-family: 'Poppins', sans-serif;
          font-weight: lighter;
        }
      }

      .favorite-rooms,
      .user-rooms {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        justify-items: stretch;
        animation: fade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
    }
  }

  @media (max-width: 500px) {
    #user-profile {
      flex-direction: column;
    }
  }
  @media (max-width: 380px) {
    .username {
      display: none;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
