import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL =
	'https://us-central1-one-time-password-93499.cloudfunctions.net';

class SignInForm extends Component {
	state = {
		phone: '',
		error: '',
		code: null,
		logedIn: false
	};

	handleSubmit = async () => {
		const { phone, code } = this.state;
		const requestBody = {
			phone,
			code
		};
		try {
			let response = await axios.post(
				`${ROOT_URL}/verifyOneTimePassword`,
				requestBody
			);
			const { data } = response;
			await firebase.auth().signInWithCustomToken(data.token);
			this.setState({ error: '', logedIn: true });
		} catch (error) {
			this.setState({ error: 'Something went wrong', logedIn: false });
		}
	};

	renderSuccess() {
		const { logedIn } = this.state;
		const { successTextStyle, containerStyle } = styles;
		if (logedIn) {
			return (
				<View style={containerStyle}>
					<Text style={successTextStyle}>
						You Loged In
					</Text>
				</View>
			);
		} else {
			return null;
		}
	}

	renderError() {
		const { error } = this.state;
		const { errorTextStyle, containerStyle } = styles;
		if (error) {
			return (
				<View style={containerStyle}>
					<Text style={errorTextStyle}>
						{error}
					</Text>
				</View>
			);
		} else {
			return null;
		}
	}

	render() {
		const { containerStyle } = styles;
		return (
			<View>
				<View style={containerStyle}>
					<FormLabel>Enter Phone Number</FormLabel>
					<FormInput
						value={this.state.phone}
						onChangeText={phone => this.setState({ phone })}
					/>
				</View>
				<View style={containerStyle}>
					<FormLabel>Enter Code</FormLabel>
					<FormInput
						value={this.state.code}
						onChangeText={code => this.setState({ code })}
					/>
				</View>
				{this.renderSuccess()}
				{this.renderError()}
				<Button onPress={this.handleSubmit} title="Submit" />
			</View>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	successTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'green'
	},
	containerStyle: {
		marginBottom: 10
	}
};

export default SignInForm;
