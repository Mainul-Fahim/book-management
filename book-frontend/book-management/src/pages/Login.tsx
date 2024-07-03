import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BookForm from '../components/form/BookForm';
import BookInput from '../components/form/BookInput';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { verifyToken } from '../utils/verifyToken';
import { TUser, setUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
 
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Logging in');

    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      console.log(userInfo);
      const res = await login(userInfo).unwrap();
      console.log(res);
      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate(`/`);
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <BookForm onSubmit={onSubmit}>
        <BookInput type="text" name="username" label="Username:" />
        <BookInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
        <p style={{margin: '5px', padding: '5px',color: 'blue'}}>Don't have an account?</p> {" "} 
        <Link to={'/register'}><Button>Sign Up</Button></Link>
      </BookForm>
    </Row>
  );
};

export default Login;