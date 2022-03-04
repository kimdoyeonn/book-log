import Login from '../components/user/Login';
import useTitle from '../hooks/useTitle';

const Main = ({
  handleLogin,
  handleUsername,
}: {
  handleLogin: () => void;
  handleUsername: (name: string) => void;
}) => {
  useTitle('메인 | 북로그');

  return (
    <div>
      <Login handleLogin={handleLogin} handleUsername={handleUsername} />
    </div>
  );
};

export default Main;
