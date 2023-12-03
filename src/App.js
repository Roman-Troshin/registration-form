import styles from './App.module.css';
import { useState, useRef } from 'react';

import { useRegistrationForm } from './use-states/use-registration-form';
import { checkIsErrorsExist } from './help-functions/check-is-errors-exist';
import { checkIsAllFieldsFulled } from './help-functions/check-is-all-fields-fulled';

export const App = () => {
	const { getRegistrationInfo, updateRegistrationInfo } = useRegistrationForm();
	const { email, password, repeatedPassword } = getRegistrationInfo();

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordnError] = useState(null);
	const [repeatedPasswordError, setRepeatedPasswordnError] = useState(null);

	const submitButtonRef = useRef(null);

	const isButtonDisabled = checkIsErrorsExist(
		emailError,
		passwordError,
		repeatedPasswordError,
	);
	const isAllButtonsFulled = checkIsAllFieldsFulled(email, password, repeatedPassword);

	const onEmailChange = ({ target }) => {
		updateRegistrationInfo(target.name, target.value);

		let error = null;

		if (!/^[a-zA-Z0-9@.]+$/.test(target.value)) {
			error =
				'Адрес электронной почты не должен содержать пробелов, а также иных символов, кроме "@"';
		}

		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		updateRegistrationInfo(target.name, target.value);

		let error = null;

		if (target.value.length < 7) {
			error = 'Пароль не должен быть меньше 7 символов';
		} else if (target.value.length > 15) {
			error = 'Пароль не должен быть длиннее 15 символов';
		}

		setPasswordnError(error);
	};

	const onRepeatedPasswordChange = ({ target }) => {
		updateRegistrationInfo(target.name, target.value);
		console.log(!isButtonDisabled, isAllButtonsFulled);
		if (!isButtonDisabled && isAllButtonsFulled && password.length === target.value.length) {
			submitButtonRef.current.focus();
		}
	};

	const onEmailBlur = ({ target }) => {
		let error = null;

		if (!/^(?=.*\.)^(?=.*@)[a-zA-Z\d@.]*$/.test(target.value)) {
			error = 'Адрес электронной почты должен содержать точку и хотя бы один символ "@".';
		}
		setEmailError(error);
	};

	const onPasswordBlur = ({ target }) => {
		let error = null;

		if (!/^(?=.*[A-Z])(?=.*[!?#$%№&*])[a-zA-Z\d!?#$%№&*]*$/.test(target.value)) {
			error =
				'Пароль должен содержать хотя бы одну заглавную букву и хотя бы один из символов "!?#$%№&*"';
		}

		setPasswordnError(error);
	};

	const onRepeatedPasswordBlur = ({ target }) => {
		let error = null;

		if (password !== target.value) {
			error = 'Пароли должны быть одинаковыми.';
		}

		setRepeatedPasswordnError(error);
	};

	const sendRegistrationData = (formRegistration) => {
		console.log(formRegistration);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendRegistrationData(getRegistrationInfo());
	};

	return (
		<div className={styles.container}>
			{emailError && <div className={styles.errorLabel}>{emailError}</div>}
			{passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
			{repeatedPasswordError && (
				<div className={styles.errorLabel}>{repeatedPasswordError}</div>
			)}
			<form onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="email"
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				<input
					type="password"
					name="repeatedPassword"
					value={repeatedPassword}
					placeholder="Повторите пароль"
					onChange={onRepeatedPasswordChange}
					onBlur={onRepeatedPasswordBlur}
				/>
				<button ref={submitButtonRef} type="submit" disabled={isButtonDisabled}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
