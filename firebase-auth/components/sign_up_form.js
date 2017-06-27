import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL =
	'https://us-central1-one-time-password-93499.cloudfunctions.net';

class SignUpForm extends Component {
	state = {
		phone: '',
		error: ''
	};

	handleSubmit = async () => {
		const requestBody = {
			phone: this.state.phone
		};
		try {
			await axios.post(`${ROOT_URL}/createUser`, requestBody);
			await axios.post(`${ROOT_URL}/requestOneTimePassword`, requestBody);
			this.setState({ error: '' });
		} catch (error) {
			this.setState({ error: 'Something went wrong' });
		}
	};

	renderError() {
		const { error } = this.state;
		const { errorTextStyle } = styles;
		if (error) {
			return (
				<View>
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
		return (
			<View>
				<View style={{ marginBottom: 10 }}>
					<FormLabel>Enter Phone Number</FormLabel>
					<FormInput
						value={this.state.phone}
						onChangeText={phone => this.setState({ phone })}
					/>
				</View>
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
	}
};

export default SignUpForm;
