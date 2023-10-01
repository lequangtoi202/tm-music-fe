import { useDispatch } from 'react-redux';
import { TIME_SHOW_OUT } from '../constant';
import { clearError, setError } from '../redux/errorReducer';
import { clearSuccess, setSuccess } from '../redux/successReducer';

export const UtilsFunction = () => {
  const dispatch = useDispatch();

  const handleShowSuccess = (message: string) => {
    dispatch(setSuccess(message));

    setTimeout(() => {
      dispatch(clearSuccess());
    }, TIME_SHOW_OUT);
  };

  const handleShowError = (message: string) => {
    dispatch(setError(message));

    setTimeout(() => {
      dispatch(clearError());
    }, TIME_SHOW_OUT);
  };

  return {
    handleShowSuccess,
    handleShowError,
  };
};
