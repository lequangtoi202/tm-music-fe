import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/user';
import { KContext } from '../../context';
import { removeCurrentUser } from '../../utils/storage';

function Logout() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(KContext);
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      removeCurrentUser();
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng xuất:', error);
    }
  };
  useEffect(() => {
    handleLogout();
    navigate('/login');
  }, []);

  return <></>;
}

export default Logout;
