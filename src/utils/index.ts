import { useDispatch } from 'react-redux';
import { clearError, setError } from '../redux/errorReducer';
import { clearSuccess, setSuccess } from '../redux/successReducer';

export const UtilsFunction = () => {
  const dispatch = useDispatch();

  const handleShowSuccess = (message: string) => {
    dispatch(setSuccess(message));

    setTimeout(
      () => {
        dispatch(clearSuccess());
      },
      parseInt(process.env.TIME_SHOW_OUT || '0', 10),
    );
  };

  const handleShowError = (message: string) => {
    dispatch(setError(message));

    setTimeout(
      () => {
        dispatch(clearError());
      },
      parseInt(process.env.TIME_SHOW_OUT || '0', 10),
    );
  };

  return {
    handleShowSuccess,
    handleShowError,
  };
};
