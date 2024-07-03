import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import BookForm from '../components/form/BookForm';
import BookInput from '../components/form/BookInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useRegisterMutation } from '../redux/features/auth/authApi';

const Register = () => {

    const navigate = useNavigate();

    const [register] = useRegisterMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading('Signing in');

        try {
            const userInfo = {
                username: data.username,
                email: data.email,
                password: data.password,
            };
            console.log(userInfo);
            const res = await register(userInfo).unwrap();
            console.log(res);
            // const user = verifyToken(res.data.token) as TUser;
            // dispatch(setUser({ user: user, token: res.data.token }));
            toast.success('Registration Completed Successfully', { id: toastId, duration: 2000 });
            navigate(`/login`);
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <BookForm onSubmit={onSubmit}>
                <BookInput type="text" name="username" label="Username:" />
                <BookInput type="email" name="email" label="Email:" />
                <BookInput type="text" name="password" label="Password" />
                <Button htmlType="submit">Signup</Button>
            </BookForm>
        </Row>
    );
};

export default Register;