import Login from '../components/user/Login';
import useTitle from '../hooks/useTitle';

export interface LoginProps {
  handleLogin: () => void;
  handleUsername: (name: string) => void;
}

const Main = ({ handleLogin, handleUsername }: LoginProps) => {
  useTitle('메인 | 북로그');

  return <Login handleLogin={handleLogin} handleUsername={handleUsername} />;
};

export default Main;
