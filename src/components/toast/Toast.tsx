import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../store';
import styled from 'styled-components';
import { UIActions } from '../../store/slices/UI/UISlice';
const override = `
  display: flex;
  gap: 0.5rem;
  align-item: center;
`;
const LoadToast = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  color: ${({ theme }) => theme.primary.color};
`;
export function Toast() {
  const { UI: UIstate, theme } = useSelector((state: RootState) => state);
  const toastId = useRef<any>(null);
  const dispatch = useDispatch();
  const notifyLoad = () => {
    toastId.current =
      theme.theme.title === 'light'
        ? toast(
            <LoadToast>
              <SyncLoader
                color={theme.theme.primary.color}
                loading={UIstate.isLoading}
                size={10}
                css={override}
              />
              Loading
            </LoadToast>
          )
        : toast.dark(
            <LoadToast>
              <SyncLoader
                color={theme.theme.primary.color}
                loading={UIstate.isLoading}
                size={10}
                css={override}
              />
              Loading
            </LoadToast>
          );
  };

  const notifyError = () => {
    toastId.current =
      theme.theme.title === 'light'
        ? toast(<LoadToast>❌ {UIstate.error.msg}</LoadToast>)
        : toast.dark(<LoadToast>❌ {UIstate.error.msg}</LoadToast>);
  };

  const notifySuccess = () => {
    toastId.current =
      theme.theme.title === 'light'
        ? toast(<LoadToast>✅ {UIstate.success.msg}</LoadToast>)
        : toast.dark(<LoadToast>✅ {UIstate.success.msg}</LoadToast>);
  };

  const dismiss = () => {
    toast.dismiss(toastId.current);
    toastId.current = null;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (UIstate.isLoading) {
      notifyLoad();
      timer = setTimeout(() => {
        if (toastId.current) {
          dismiss();
          dispatch(UIActions.setIsLoading({ loading: false }));
          setTimeout(() => {
            dispatch(
              UIActions.setError({
                msg: 'Loading exceeded time limit!',
              })
            );
          }, 1000);
        }
      }, 5000);
    }
    if (UIstate.success.hasMsg) {
      notifySuccess();
      timer = setTimeout(() => {
        dispatch(UIActions.clearSuccess());
      }, 3000);
    }
    if (UIstate.error.hasError) {
      notifyError();
      timer = setTimeout(() => {
        dispatch(UIActions.clearError());
      }, 3000);
    }
    return () => {
      dismiss();
      if (timer) clearTimeout(timer);
    };
  }, [UIstate]);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        icon={true}
        pauseOnFocusLoss
        draggable
        style={{ display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
}
