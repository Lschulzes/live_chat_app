import ReactModal from 'react-modal';
import styled from 'styled-components';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { UIActions } from '../../../store/slices/UI/UISlice';
const ModalDiv = styled.div`
  z-index: 50;
  ${(props) =>
    `background-image: linear-gradient(45deg,${props.theme.primary.bg} ,${props.theme.primary.bg_darker}) `};
  color: ${(props) => props.theme.primary.color};

  max-width: 30rem;
  border-radius: 10px;

  .modal-header {
    border-bottom: solid 1px #aaa;
    padding: 0.75rem;
    display: flex;
    justify-content: center;
  }
  .modal-body {
    padding: 1.5rem 2.5rem;

    p {
      padding: 1rem 0 0 0;
    }
  }
  .modal-footer {
    display: flex;
    padding: 0.75rem;
    gap: 1rem;
    justify-content: flex-end;
  }
`;
const OverlayDiv = styled.div`
  background: #000000aa;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  overflow: hidden;
`;

export default function Modal() {
  const { heading, text, action, title } = useSelector(
    (state: RootState) => state.UI.modal
  );
  const isOpen = useSelector((state: RootState) => state.UI.isModalOpen);
  const dispatch = useDispatch();
  const toggle = () => dispatch(UIActions.toggleModal());
  const dispatchAction = () => {
    dispatch(UIActions.setTrigger({ on: true }));
    toggle();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={toggle}
      preventScroll={true}
      className='_'
      overlayClassName='_'
      contentElement={(props, children) => (
        <ModalDiv {...props}>{children}</ModalDiv>
      )}
      overlayElement={(props, contentElement) => (
        <OverlayDiv {...props}>{contentElement}</OverlayDiv>
      )}
      shouldFocusAfterRender
    >
      <div className='modal-header'>
        <h3>{title}</h3>
      </div>
      <div className='modal-body'>
        <h1>{heading}</h1>
        <p>{text}</p>
      </div>
      <div className='modal-footer'>
        <Button onClick={toggle} isOutlined>
          Close
        </Button>
        <Button onClick={dispatchAction}>{action}</Button>
      </div>
    </ReactModal>
  );
}
