import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

WebBrowser.maybeCompleteAuthSession();

const LoginPage = ({ navigateToHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState();


   
    const [request, response, promptAsync] = Facebook.useAuthRequest({
      clientId: "2123016781384670",
    });


    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
      webClientId:
        "1091673403080-a4tgoo1n5okspdmeap8u6qgn2unu819q.apps.googleusercontent.com",
      androidClientId:
        "1091673403080-hg5u7so7dnkons3nidhq8hndti10er8l.apps.googleusercontent.com",
      iosClientId:
        "1091673403080-gio966r3ufqroousq6lj3nskcd6pjtbd.apps.googleusercontent.com",
    });
    };
  
    React.useEffect(() => {
      configureGoogleSignIn();
    });
  
  
  const signInGoogle = async () => {
    console.log("Pressed sign in");
    logout(); 
  
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo); 
      setUserInfo(userInfo);
      setError(); 
  
      // Redirect to the home page after successful Google sign-in
      console.log(userInfo); 
      navigateToHome(userInfo);
  
    } catch (e) {
      console.log(e); 
      setError(e); 
    }
  };

  const logout = () => {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    setUserInfo(undefined); 
  };
  
    React.useEffect(() => {
      if (response && response.type === "success" && response.authentication) {
        (async () => {
          const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
          );
          const userInfo = await userInfoResponse.json();
          setUserInfo(userInfo);
          console.log(JSON.stringify(response, null, 2));
        })();
      }
    }, [response]);
  
    const handleFacebook = async () => {
      const result = await promptAsync();
      if (result.type !== "success") {
        alert("Uh oh, something went wrong");
        return;
      }
    };

  const handleNormalLogin = () => {
    setLoading(true);

    const apiUrl = "https://8861-119-161-98-68.ngrok-free.app/login_user";

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);

        if (data.id !== "-1") {
          setUsername(username);
          navigateToHome(username);
        } else {
          Alert.alert('Error', 'Username or password is incorrect.', [{ text: 'OK' }]);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
        Alert.alert('Error', 'Unable to connect to the server.', [{ text: 'OK' }]);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome To Spwise</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNormalLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
        )}
      </View>
      <View style={styles.socialButtons}>
        <TouchableOpacity
          style={[styles.button, styles.facebookButton]}
          onPress={handleFacebook}
        >
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={signInGoogle}
        >
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color:'white'
  },
  form: {
    width: '80%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButtons: {
    width: '80%',
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  signInButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
});

export default LoginPage;




