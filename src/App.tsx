import { Chat, Channel, CreateChannel, DashBoard, Main } from 'web3-mq-react';
import { Web3MQ } from 'web3-mq';
import './App.css';
import 'web3-mq-react/dist/css/index.css';
import ChannelInner from './components/ChannelInner';
import Login from './components/Login';
import useLogin from './hooks/useLogin';
import {useEffect, useState} from 'react';

const App = () => {
  const { signMetamask, token } = useLogin();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    // 保证事件只挂载一次  避免重复render
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 600);
    });
  }, []);

  if (!token) {
    return <Login sign={signMetamask} />;
  }

  const client = Web3MQ.getInstance(token);
  return (
    <Chat client={client} isMobile={isMobile}>
      <DashBoard />
      <Main />
      <Channel>
        <CreateChannel />
        <ChannelInner />
      </Channel>
    </Chat>
  );
};

export default App;
