import React from "react";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, HelperText, Text, useTheme, MD3Theme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const styles = makeStyles(theme)
    const initialValues = {
        email: "",
        password: ""
    }
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => { }}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values
                }) => (
                    <View style={styles.formContainer}>
                        <View>
                            <Text style={styles.welcomeNote} >Welcome Back</Text>
                            <Text style={styles.headerText}>Let's sign you in</Text>
                        </View>
                        <View>
                            <View style={styles.inputContainer} >
                                <TextInput
                                    label="Email"
                                    mode="outlined"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <TextInput
                                    label="Password"
                                    mode="outlined"
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    secureTextEntry
                                />
                            </View>
                            <Button mode="contained" onPress={() => handleSubmit()} > Sign in </Button>
                            <Text style={styles.registerContainer} >Don't have an account ? <Text style={styles.registerText} onPress={() => navigation.navigate("Signup" as never)} >Register here</Text></Text>
                        </View>
                    </View>
                )}

            </Formik>
        </View>
    )
}

export default Login;

const makeStyles = (theme: MD3Theme) => (
    StyleSheet.create({
        container: {
            flex: 1,
        },
        formContainer: {
            flex: 1,
            padding: 20,
            justifyContent: "center"
        },
        welcomeNote: {
            fontSize: 20,
            textAlign: "center"
        },
        headerText: {
            fontSize: 35,
            textAlign: "center",
            fontWeight: "bold"
        },
        inputContainer: {
            marginVertical: 13,
            gap: 5
        },
        registerContainer: {
            fontSize: 16,
            marginTop: 16,
            textAlign: "center"
        },
        registerText: {
            fontWeight: "bold",
            color: theme.colors.primary
        }
    })
)