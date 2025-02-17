import { styled, css } from 'styled-components';
import { useState } from 'react';

interface LoginPageProps {
    onClickToggleModal?: () => void;
    children?: React.ReactNode;
}

function LoginPage({ onClickToggleModal }: LoginPageProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    function isEmailValid(email: string): boolean {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    function isPasswordValid(pw: string): boolean {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        return regex.test(pw);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmail(value);
            if (value === '') {
                setEmailError('');
            } else if (!isEmailValid(value)) {
                setEmailError('유효한 이메일 주소를 입력해주세요.');
            } else {
                setEmailError('');
            }
        } else if (name === 'password') {
            setPassword(value);
            if (value === '') {
                setPasswordError('');
            } else if (!isPasswordValid(value)) {
                setPasswordError('8~16글자의 알파벳,숫자,특수문자를 최소1개이상 포함한 비밀번호여야 합니다.');
            } else {
                setPasswordError('');
            }
        }

        console.log("타자",e.target.value);
    };

    const handleSubmit = () => {
        const myId = {
            email,
            password,
        };
        console.log("로그인 data 슛",myId);
        // dispatch(postData({ method: "post", path: '', data: myId }));
    };

    return (
        <>
            <LoginModaltop>
                <LoginModalmain>
                    <LoginModalmain_low>
                        <LoginModallogo>일요시네마</LoginModallogo>
                        <LoginModallogin>로그인</LoginModallogin>
                        <LoginModalinput
                            placeholder="이메일"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        ></LoginModalinput>
                        <LoginModalinput
                            placeholder="비밀번호"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        ></LoginModalinput>
                        <LoginModalerrorwrap>
                            {emailError && <LoginModalerror>{emailError}</LoginModalerror>}
                            {passwordError && <LoginModalerror>{passwordError}</LoginModalerror>}
                        </LoginModalerrorwrap>
                        <LoginModalbuttonin onClick={handleSubmit}>로그인</LoginModalbuttonin>
                        <LoginModalbuttonup>회원가입</LoginModalbuttonup>
                        <LoginModalorwrap>
                            <LoginModalor>OR</LoginModalor>
                            <LoginModalline></LoginModalline>
                        </LoginModalorwrap>
                        <LoginModaloauthwrap>
                            <LoginModaloauth>Oauth</LoginModaloauth>
                        </LoginModaloauthwrap>
                    </LoginModalmain_low>
                </LoginModalmain>
                <LoginModalbackground onClick={onClickToggleModal}></LoginModalbackground>
            </LoginModaltop>
        </>
    );
}

const LoginModaltop = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginModalbackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgba(77, 77, 77, 0.7);
    /* 마지막이 투명도 조절 */
`;

const LoginModalmain = styled.div`
    position: relative;
    width: 370px;
    height: 570px;
    z-index: 10;
    /* border: 1px solid black; */
    padding-bottom: 12px;
    padding-top: 36px;
    border-radius: 10px;
    background-color: white;
`;

const LoginModalmain_low = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LoginModallogo = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #d6a701;
`;
const LoginModallogin = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: black;
    margin-top: 36px;
    margin-bottom: 36px;
`;

const LoginModalwidth = css`
    width: 320px;
`;

const LoginModalinput = styled.input`
    font-size: 16px;
    font-weight: 500;
    color: #505050;
    margin-top: 6px;
    margin-bottom: 6px;
    border: 0px solid black;
    background-color: #d9d9d973;
    height: 42px;
    padding: 6px;
    padding-left: 12px;
    ${LoginModalwidth}
`;

const LoginModalerrorwrap = styled.div`
    position: relative;
    height: 12px;
    justify-content: center;
    align-items: center;
`;

const LoginModalerror = styled.div`
    position: relative;
    font-size: 8px;
    color: #797979;
    text-align: center;
`;

const LoginModalbuttonin = styled.button`
    font-size: 14px;
    font-weight: 500;
    color: black;
    margin-top: 36px;
    margin-bottom: 4px;
    border: 0px solid black;
    border-radius: 20px;
    background-color: #ffe800;
    ${LoginModalwidth}
    height: 42px;
    cursor: pointer;

    &:hover {
        background-color: #cfc54e;
    }
`;

const LoginModalbuttonup = styled.button`
    font-size: 14px;
    font-weight: 500;
    color: white;
    margin-top: 4px;
    margin-bottom: 36px;
    border: 0px solid black;
    border-radius: 20px;
    background-color: #04d218;
    ${LoginModalwidth}
    height: 42px;
    cursor: pointer;

    &:hover {
        background-color: #309e3b;
    }
`;

const LoginModalorwrap = styled.div`
    position: relative;
    margin-top: 0px;
    margin-bottom: 0px;
    /* ${LoginModalwidth} */
    width: 100%;
`;

const LoginModalor = styled.div`
    position: relative;
    font-size: 15px;
    font-weight: 500;
    font-style: italic;
    text-align: center;
    margin: 0 auto;
    height: 22px;
    width: 68px;
    background-color: white;
    color: black;
    z-index: 3;
`;

const LoginModalline = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    border: 1px solid #797979;
    z-index: 2;
`;

const LoginModaloauthwrap = styled.div`
    margin-top: 28px;
`;

const LoginModaloauth = styled.div``;

export default LoginPage;
