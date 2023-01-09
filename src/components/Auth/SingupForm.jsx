import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavButton from '../layout/Buttons/NavButton';
import classes from './SignupForm.module.scss';

const SingupForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPwd, setEnteredPwd] = useState();
  const [enteredUsername, setEnteredUsername] = useState('');

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [pwdIsValid, setPwdIsValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [samePwdIsValid, setSamePwdIsValid] = useState(false);

  const emailRef = useRef();
  const nameRef = useRef();
  const pwdRef = useRef();
  const samePwdRef = useRef();

  const emailValueHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const pwdValueHandler = (e) => {
    setEnteredPwd(e.target.value);
  };
  const usernameHandler = (e) => {
    setUsernameIsValid(e.target.value);
  };

  const validationHandler = () => {
    if (enteredEmail === undefined) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(enteredEmail.includes('@'));
    }
    if (enteredPwd === undefined) {
      setPwdIsValid(false);
    } else {
      setPwdIsValid(enteredPwd.trim().length > 5);
    }
    if (enteredUsername === undefined) {
      setUsernameIsValid(enteredUsername.trim().length > 1);
    }
    if (enteredPwd === samePwdRef.current.value) {
      console.log(samePwdRef.current.value);
      setSamePwdIsValid(true);
    }

    setSubmitted(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;
    validationHandler();
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5MykwB0XPBgc1l7QgzZdz0CBouXSXUyM',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPwd,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => {
      alert(err.message);
    });
    console.log(samePwdIsValid, samePwdRef.current.value, enteredPwd);
  };

  const signupCondClass = `${classes.signup_input_field} ${
    emailIsValid === false && submitted
      ? classes.signup_input_field_invalid
      : ''
  }`;
  const pwdCondClass = `${classes.signup_input_field} ${
    pwdIsValid === false && submitted ? classes.signup_input_field_invalid : ''
  }`;
  const nameCondClass = `${classes.signup_input_field} ${
    usernameIsValid === false && submitted
      ? classes.signup_input_field_invalid
      : ''
  }`;

  return (
    <div className={classes.signup_container}>
      <div className={classes.signup_card_wrapper}>
        <section className={classes.signup_title_section}>
          <h1>회원님의 정보를 입력해 주세요</h1>
        </section>
        <form className={classes.signup_input_wrapper}>
          <input
            className={signupCondClass}
            placeholder={'이메일 주소  ( 형식: hello@atThePlace.com )'}
            ref={emailRef}
            type={'email'}
            onChange={emailValueHandler}
          />
          {emailIsValid === false && submitted ? (
            <p className={classes.invalid_note}>
              이메일 형식이 올바르지 않습니다
            </p>
          ) : (
            ''
          )}

          <input
            className={nameCondClass}
            placeholder={'성명'}
            ref={nameRef}
            onChange={usernameHandler}
          />
          {usernameIsValid === false && submitted ? (
            <p className={classes.invalid_note}>
              이름 형식이 올바르지 않습니다
            </p>
          ) : (
            ''
          )}

          <input
            className={pwdCondClass}
            placeholder={'비밀번호'}
            type={'password'}
            ref={pwdRef}
            onChange={pwdValueHandler}
          />
          {pwdIsValid === false && submitted ? (
            <p className={classes.invalid_note}>
              비밀번호 형식이 올바르지 않습니다
            </p>
          ) : (
            ''
          )}

          <input
            className={classes.signup_input_field}
            type={'password'}
            placeholder={'비밀번호 재확인'}
            ref={samePwdRef}
          />
          {samePwdIsValid === false && submitted ? (
            <p className={classes.invalid_note}>비밀번호가 일치하지 않습니다</p>
          ) : (
            ''
          )}
        </form>
        <div>
          <NavButton title={'회원가입'} event={submitHandler} />
        </div>
      </div>
    </div>
  );
};

export default SingupForm;
