import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../utils/auth.context';
import http from '../utils/http.common';

function Login() {
  const { user, authUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function validateUsername() {}

  function validatePassword() {}

  async function loginHandler(e) {
    setError(false);

    try {
      const header = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const payload = {
        username: username,
        password: password,
      };

      setIsLoading(true);

      const response = await http.post('api/v1/user/login', payload, header);

      localStorage.setItem('user', JSON.stringify(response.data));
      authUser();

      setIsLoading(false);
      navigate('/management');
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="react-container">
      <div className="content login">
        <div className="titles">
          <h2>CAFE MADDY CAB</h2>
        </div>

        <div className="request-form login">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="btn login" onClick={(e) => loginHandler(e.target)}>
          Login
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>You have an error: {error}</p>}
      </div>
    </div>
  );
}

export default Login;
