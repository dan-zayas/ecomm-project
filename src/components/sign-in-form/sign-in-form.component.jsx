import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import { ButtonsContainer, Heading, SignInContainer } from "./sign-in-form.styles";

const defaultformFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultformFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert('email/password combination not found.');
            }
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <SignInContainer>
            <Heading>Already have an account?</Heading>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                        type='button' 
                        buttonType={BUTTON_TYPE_CLASSES.google} 
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;