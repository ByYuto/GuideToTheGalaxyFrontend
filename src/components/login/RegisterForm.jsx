import React, { useState } from 'react';
import Input from './components/Input';
import { FlexContainer } from '../UI/Helpers';
import Checkbox from './components/Checkbox';
import { useForm, Controller } from 'react-hook-form';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import { validateUppercase, matchStringValidate } from './validations';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from '../../redux/actions/authActions';

export default function RegisterForm({ setDisplayRegister }) {
  const { register, handleSubmit, setValue, errors, getValues, control, formState } = useForm();
  const { isSubmitted } = formState;
  const dispatch = useDispatch();
  const { error, errorMessage, loading } = useSelector((store) => store.auth);
  const [passwordValue, setPasswordValue] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const onSubmit = (data) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUserAction(user));
  };
  const clearFields = () => {
    setValue('name', '');
    setValue('email', '');
    setValue('password', '');
    setValue('confirm_password', '');
  };

  const onChangeCheckTerms = (val) => {
    setValue('accept_terms', val);
  };

  const isChecked = getValues('accept_terms');
  return (
    <FlexContainer className="form-container" direction="column" align="center" justify="space-between" span="0">
      <p className="form-title">Sign up with an email</p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Input
          type="text"
          placeholder="User name"
          name="name"
          valid={!errors.name}
          noMargin
          errorMessage={errors?.name?.message}
          registerField={register({
            required: 'Field required',
          })}
          isSubmitted={isSubmitted}
        />

        <Input
          type="email"
          placeholder="Email"
          name="email"
          noMargin
          valid={!errors?.email}
          errorMessage={errors?.email?.message}
          isSubmitted={isSubmitted}
          registerField={register({
            required: 'Field required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          isSubmitted={isSubmitted}
          noMargin
          valid={!errors?.password}
          handleChange={(e) => setPasswordValue(e.target.value)}
          errorMessage={
            errors?.password?.type === 'upperCase' ? 'Password need at least one uppercase' : errors?.password?.message
          }
          registerField={register({
            required: 'Field required',
            minLength: {
              value: 8,
              message: 'Password need at least 8 characters',
            },
            validate: {
              upperCase: validateUppercase,
            },
          })}
        />
        <Input
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          isSubmitted={isSubmitted}
          valid={!errors?.confirm_password}
          errorMessage={
            errors?.confirm_password?.type === 'passwordMatch'
              ? "Passwords doesn't match"
              : errors?.confirm_password?.message
          }
          registerField={register({
            required: 'Field required',
            validate: { passwordMatch: (value) => matchStringValidate(value, passwordValue) },
          })}
        />
        <div style={{ width: '100%' }}>
          <Controller
            control={control}
            name="accept_terms"
            rules={{ required: 'This is required' }}
            render={({ onChange, onBlur, value, name, ref }) => (
              <Checkbox
                refCheckBox={ref}
                onChange={(val) => onChange(val)}
                checked={value}
                onBlur={onBlur}
                name={name}
              />
            )}
          />{' '}
          <span>
            I accept the <a href="#">Terms and Conditions</a>
          </span>
        </div>
        {errors?.accept_terms && (
          <div style={{ width: '100%' }}>
            <span className="validation">{errors?.accept_terms?.message}</span>
          </div>
        )}
        <div style={{ width: '100%' }}>
          <p>
            <button onClick={(e) => setDisplayRegister(false)}>Log in</button>
          </p>
        </div>

        {!loading ? (
          <FlexContainer span="0" padding="0" justify="center">
            <Button span="24px" onClick={clearFields} rounded modalSecondary>
              Clear
            </Button>
            <Button span="24px" type="submit" rounded>
              Register
            </Button>
          </FlexContainer>
        ) : (
          <FlexContainer justify="center" align="center">
            <Loader />
          </FlexContainer>
        )}
        {error && <div className="error-message">{errorMessage}</div>}
      </form>
    </FlexContainer>
  );
}
