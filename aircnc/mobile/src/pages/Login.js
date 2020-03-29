import React, { useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import logo from './../assets/logo.png'
import api from '../services/api'

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState('')

    async function handleSubmit(){
        api.post('/login',{
            email,
            password
        })
        .then(async (res)=>{
            await AsyncStorage.setItem('user_token', res.data.token)
            navigation.navigate('List')
        })
        .catch(err => {
            console.log('Error on user login', err)
            setWarning('Erro ao logar, email ou senha inválido(s).')
            setEmail('')
            setPassword('')
        })
    }

    return (
        <KeyboardAvoidingView behavior='padding ' style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.warning}>{warning}</Text>
                <Text style={styles.label}>SEU E-EMAIL *</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Seu e-mail"
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={styles.input}
                    autoCapitalize="none"></TextInput>

                <Text style={styles.label}>SENHA *</Text>
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    style={styles.input}
                    placeholder="Sua senha"
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="words"></TextInput>
                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonTxt}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonTxt}>Cadastro</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form : {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color : '#444',
        marginVertical: 15
    },
    input: {
        borderColor: "#ddd",
        padding: 10,
        borderWidth: 1,
        height: 44,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    buttonTxt : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})