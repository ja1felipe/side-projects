import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, Image, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import logo from '../assets/logo.png'
export default function Register({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
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
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Digite sua senha'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    autoCorrect={false}
                    style={[styles.input, styles.inputPassword]}></TextInput>

                <Text style={styles.label}>REPITA A SENHA *</Text>
                <TextInput
                    onChangeText={text => { text === password ? styles.inputPassword.borderColor = 'green' : styles.inputPassword.borderColor = 'red'}}
                    placeholder='Digite sua senha novamente'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={[styles.input, styles.inputPassword]}></TextInput>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTxt}>Cadastrar</Text>
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