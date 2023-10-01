import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userReducer';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteCookie = (name: string) => {
    document.cookie = name + '=; Max-Age=-99999999;';
  };

  useEffect(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch(logout());

    navigate('/', { replace: true });
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;
