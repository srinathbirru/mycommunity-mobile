import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button, HelperText, Text, useTheme, MD3Theme, Card } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import * as Yup from 'yup';
import { IconButton } from 'react-native-paper';
import { DropdownOptions, formValues } from "../../types/interfaces/Signup";
// import { pickSingle, DocumentPickerResponse, types } from "react-native-document-picker";


const data = [
    { label: 'Sai Sris Grandway Enclave', value: "1" },
    { label: 'Vaishnavi Nagar', value: '2' },
];

const houseNumberData = [
    {
        label: '1',
        value: "1"
    },
    {
        label: '2',
        value: "2"
    }
]

const Signup = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [isFocus, setIsFocus] = useState({
        community: false,
        houseNumber: false
    });
    const [dropdownData, setDropdownData] = useState<DropdownOptions[]>([]);
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    // const [addressProof, setAddressProof] = useState<DocumentPickerResponse | null>(null)
    const initialValues = {
        community: null,
        houseNumber: null,
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        password: "",
        addressProofDoc: null
    }

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("First name is required")
            .min(2, "First name must be at least 2 characters"),
        lastName: Yup.string()
            .required("Last name is required")
            .min(2, "Last name must be at least 2 characters"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        mobile: Yup.string()
            .matches(/^[0-9]+$/, "Mobile number must be digits")
            .required("Mobile number is required"),
        community: Yup.string()
            .required("Please select a community"),
        houseNumber: Yup.string()
            .required("House or plot number is required"),
        addressProofDoc: Yup.mixed()
            .required("Address proof is required")
    });

    const handleSearchInput = (searchInput: string) => {
        setSearchQuery(searchInput)
        if (searchInput === "") {
            setDropdownOptions([])
            return;
        }
        setDropdownOptions(dropdownData.filter((option) => option.label.toLowerCase().includes(searchInput.toLowerCase())))
    }

    const handleDropdownFocus = (field: string) => {
        setIsFocus((prevState => ({ ...prevState, [`${field}`]: true })));
        if (!searchQuery) {
            setDropdownOptions([]);
        }
    }

    // const handleFileUpload = async (values: formValues, setFieldValue: (field: string, value: any) => void) => {
    //     try {
    //         if (!(values.community && values.houseNumber)) {
    //             return;
    //         }
    //         const doc = await pickSingle({
    //             type: [types.pdf]
    //         });
    //         setAddressProof(doc);
    //         setFieldValue("addressProofDoc", doc);
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    const handleFormSubmit = (values: formValues) => {
        console.log("values:", values)
    }

    useEffect(() => {
        setDropdownData(data)
    }, [])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.container}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleFormSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        setFieldValue,
                        touched,
                        values,
                        errors,
                        resetForm
                    }) => (
                        <View style={styles.formContainer} >
                            <View>
                                <Text style={styles.headerText}>Create an account</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Dropdown
                                    data={dropdownOptions}
                                    style={[styles.dropdown, isFocus.community && styles.focusDropdown]}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Community"
                                    search
                                    searchPlaceholder="Search..."
                                    onFocus={() => handleDropdownFocus("community")}
                                    onBlur={() => {
                                        setIsFocus((prevState => ({ ...prevState, community: false })));
                                        handleBlur("community");
                                    }}
                                    onChange={(item) => setFieldValue("community", item.value)}
                                    renderInputSearch={() => (
                                        <TextInput
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChangeText={handleSearchInput}
                                            style={styles.searchInput}
                                        />
                                    )}
                                    value={values.community}
                                />
                                {touched.community && errors.community && (
                                    <HelperText type="error" visible={true}>
                                        {errors.community}
                                    </HelperText>
                                )}

                                <Dropdown
                                    data={houseNumberData}
                                    style={[styles.dropdown, isFocus.houseNumber && styles.focusDropdown, !values.community && styles.disableField]}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Flat / House no."
                                    search
                                    searchPlaceholder="Search..."
                                    onFocus={() => handleDropdownFocus("houseNumber")}
                                    onBlur={() => {
                                        setIsFocus((prevState => ({ ...prevState, houseNumber: false })));
                                        handleBlur("houseNumber");
                                    }}
                                    onChange={(item) => setFieldValue("houseNumber", item.value)}
                                    disable={values.community ? false : true}
                                    placeholderStyle={!values.community && styles.disableLabel}
                                    value={values.houseNumber}
                                />
                                {touched.houseNumber && errors.houseNumber && (
                                    <HelperText type="error" visible={true}>
                                        {errors.houseNumber}
                                    </HelperText>
                                )}

                                <TextInput
                                    label="First Name"
                                    mode="outlined"
                                    onChangeText={handleChange("firstName")}
                                    value={values.firstName}
                                    disabled={values.community && values.houseNumber ? false : true}
                                    style={!(values.community && values.houseNumber) && styles.disableField}
                                />
                                {touched.firstName && errors.firstName && (
                                    <HelperText type="error" visible={true}>
                                        {errors.firstName}
                                    </HelperText>
                                )}
                                <TextInput
                                    label="Last Name"
                                    mode="outlined"
                                    onChangeText={handleChange("lastName")}
                                    value={values.lastName}
                                    disabled={values.community && values.houseNumber ? false : true}
                                    style={!(values.community && values.houseNumber) && styles.disableField}
                                />
                                {touched.lastName && errors.lastName && (
                                    <HelperText type="error" visible={true}>
                                        {errors.lastName}
                                    </HelperText>
                                )}

                                <TextInput
                                    label="Mobile"
                                    mode="outlined"
                                    onChangeText={handleChange("mobile")}
                                    value={values.mobile}
                                    keyboardType="numeric"
                                    disabled={values.community && values.houseNumber ? false : true}
                                    style={!(values.community && values.houseNumber) && styles.disableField}
                                />
                                {touched.mobile && errors.mobile && (
                                    <HelperText type="error" visible={true}>
                                        {errors.mobile}
                                    </HelperText>
                                )}

                                <TextInput
                                    label="Email"
                                    mode="outlined"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                    disabled={values.community && values.houseNumber ? false : true}
                                    style={!(values.community && values.houseNumber) && styles.disableField}
                                />
                                {touched.email && errors.email && (
                                    <HelperText type="error" visible={true}>
                                        {errors.email}
                                    </HelperText>
                                )}
                                <TextInput
                                    label="Password"
                                    mode="outlined"
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    secureTextEntry
                                    disabled={values.community && values.houseNumber ? false : true}
                                    style={!(values.community && values.houseNumber) && styles.disableField}
                                />
                                {touched.password && errors.password && (
                                    <HelperText type="error" visible={true}>
                                        {errors.password}
                                    </HelperText>
                                )}

                                {/* <View style={styles.addressProofContainer} >
                                    <IconButton
                                        icon="cloud-upload"
                                        size={25}
                                        disabled={values.community && values.houseNumber ? false : true}
                                        onPress={() => handleFileUpload(values, setFieldValue)}
                                    />
                                    <Text style={[styles.addressProofText, !(values.community && values.houseNumber) && styles.disableText]} onPress={() => handleFileUpload(values, setFieldValue)}>Upload address proof</Text>
                                    {touched.addressProofDoc && errors.addressProofDoc && (
                                        <HelperText type="error" visible={true}>
                                            {errors.addressProofDoc}
                                        </HelperText>
                                    )}
                                </View> */}
                                {values.addressProofDoc !== null &&
                                    <View style={styles.cardContainer} >
                                        <Text style={styles.cardText}>{values.addressProofDoc["name"]}</Text>
                                        <IconButton
                                            icon="delete"
                                            size={20}
                                            iconColor={theme.colors.error}
                                            onPress={() => setFieldValue("addressProofDoc", null)}
                                        />
                                    </View>
                                }
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button mode="contained" onPress={() => handleSubmit()}> Create </Button>
                                <Button
                                    mode="contained"
                                    buttonColor={theme.colors.secondary}
                                    onPress={() => {
                                        resetForm();
                                        setSearchQuery("");
                                    }
                                    }> Reset </Button>
                            </View>
                        </View>
                    )}

                </Formik>
            </View>
        </ScrollView>
    )
}

export default Signup;

const makeStyles = (theme: MD3Theme) => (
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center"
        },
        formContainer: {
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            gap: 16
        },
        inputContainer: {
            gap: 5
        },
        headerText: {
            fontSize: 35,
            textAlign: "center",
            fontWeight: "bold"
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 10
        },
        dropdown: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: 5
        },
        focusDropdown: {
            borderColor: theme.colors.primary,
            borderWidth: 2
        },
        searchInput: {
            borderColor: 'gray',
            borderBottomColor: "gray",
            borderRadius: 5,
            backgroundColor: "white",
            height: 45
        },
        disableField: {
            backgroundColor: '#e0e0e0',
            borderColor: '#bdbdbd'
        },
        disableLabel: {
            color: '#9e9e9e'
        },
        addressProofContainer: {
            flexDirection: "row",
            alignItems: "center"
        },
        addressProofText: {
            fontSize: 16,
            fontWeight: 500
        },
        cardContainer: {
            width: '100%',
            marginBottom: 16,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: '#000',
            elevation: 3,
            padding: 12,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
        },
        cardText: {
            fontSize: 16,
            color: theme.colors.primary,
            fontWeight: "bold",
        },
        disableText: {
            color: '#bdbdbd'
        }
    })
)