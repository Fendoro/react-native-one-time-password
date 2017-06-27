import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/sign_up_form';
import SignInForm from './components/sign_in_form';

export default class App extends React.Component {
	componentDidMount() {
		const config = {
			apiKey: 'AIzaSyDdt1z1vSkn9fHtStYghhhwAJ4q-IbefEo',
			authDomain: 'one-time-password-93499.firebaseapp.com',
			databaseURL: 'https://one-time-password-93499.firebaseio.com',
			projectId: 'one-time-password-93499',
			storageBucket: 'one-time-password-93499.appspot.com',
			messagingSenderId: '557190800194'
		};
		firebase.initializeApp(config);
	}

	render() {
		return (
			<View style={styles.container}>
				<SignUpForm />
				<SignInForm />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
