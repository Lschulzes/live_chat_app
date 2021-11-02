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
      padding: 1.5rem;
      flex: 1;

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
      flex: 4;
      padding: 1.5rem 2rem;

      .general-settings {
        h2 {
          font-family: 'Poppins', sans-serif;
          font-weight: lighter;
        }
      }
    }
  }
`;
