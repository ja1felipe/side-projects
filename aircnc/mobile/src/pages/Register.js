import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, Image, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import logo from '../assets/logo.png'
import api from '../services/api'

export default function Register({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState(false)
    const [warning, setWarning] = useState('')
    const [inputBorder, setInputBorder] = useState({
        borderColor: '#ddd'
    })

    function handleRegister(){
        api.post('/register', {
            email,
            password
        }).then(() => {
            navigation.navigate('Login')
        }).catch(err => {
            console.log('Erro no cadastro', err)
        })
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        form: {
            alignSelf: 'stretch',
            marginTop: 30,
            paddingHorizontal: 30
        },
        label: {
            fontWeight: 'bold',
            marginVertical: 15,
            color: '#444'
        },
        inputPassword: {
            borderColor: "#ddd"
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
            backgroundColor: passwordVerify ? '#f05a5b' : '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15
        },
        buttonTxt: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16
        }
    })

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text>{warning}</Text>
                <Text style={styles.label}>E-MAIL *</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Digite seu e-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.input}></TextInput>

                <Text style={styles.label}>SENHA *</Text>
                <TextInput
                    onChangeText={text => {
                        if (text.length < 4) {
                            setWarning('A senha deve ter pelo menos 4 caracteres.')
                            setInputBorder({ borderColor: 'red' })
                            setPasswordVerify(false)
                        } else if (password !== confirmPassword) {
                            setWarning('')
                            setInputBorder({ borderColor: '#444' })
                            setPasswordVerify(false)
                        } else {
                            setWarning('')
                            setInputBorder({ borderColor: 'green' })
                        }
                        setPassword(text)
                    }}
                    value={password}
                    placeholder='Digite sua senha'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    autoCorrect={false}
                    style={[styles.input, inputBorder]}></TextInput>

                <Text style={styles.label}>REPITA A SENHA *</Text>
                <TextInput
                    onChangeText={text => {
                        text === password && text.length > 4 ? setInputBorder({ borderColor: 'green' }) : setInputBorder({ borderColor: 'red' })
                        if (text !== password) {
                            setWarning('As duas senhas devem ser iguais.')
                            setConfirmPassword(text)
                            setPasswordVerify(false)
                        } else {
                            setWarning('')
                            setInputBorder({ borderColor: 'green' })
                            setPasswordVerify(true)
                        }
                    }}
                    placeholder='Digite sua senha novamente'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={[styles.input, inputBorder]}></TextInput>

                <TouchableOpacity style={styles.button} disabled={!passwordVerify} onPress={handleRegister}>
                    <Text style={styles.buttonTxt}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )

}

