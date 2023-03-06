import React from 'react';
import { View, Text } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SignInData } from 'src/utils/userHelper/signIn';

import Input from 'src/ui/components/Input';
import Button from 'src/ui/components/Button';
import dataValidation from 'src/utils/validationSchemas';
import { userHelper } from 'src/utils';
import { useAppDispatch } from 'src/store';
import { userSliceActions } from 'src/store/slices/userSlice';

import mail from 'src/ui/screens/SignIn/images/mail.png';
import view from 'src/ui/screens/SignIn/images/view.png';

import styles from './SignIn.styles';

type Props = NativeStackScreenProps<ParamListBase>;

const SignIn: React.FC<Props> = (props) => {
  const { navigation } = props;

  const dispatch = useAppDispatch();

  const schema = yup.object({
    email: dataValidation.requiredEmail,
    password: dataValidation.requiredPassword,
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async (data: SignInData) => {
    try {
      const user = await userHelper.signIn(data);
      dispatch(userSliceActions.setUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text
        style={styles.titleStyle}
      >Sign in please
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            placeHolderTextColor="#4b0082"
            errors={errors.email}
            type="numbers-and-punctuation"
            underlineColorAndroid="transparent" 
            logo={mail}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
            containerErrorStyle={styles.errorSectionStyle}
            textErrorStyle={styles.errorTextStyle}
            value={value}
            hintText="Enter your email"
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            placeHolderTextColor="#b22222"
            errors={errors.password}
            type="default"
            underlineColorAndroid="transparent"
            logo={view}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
            containerErrorStyle={styles.errorSectionStyle}
            textErrorStyle={styles.errorTextStyle}
            value={value}
            hintText="Enter your password"
            onBlur={onBlur}
            onChangeText={onChange}
            secure
          />
        )}
      />
      <Button
        activeOpacity={0.8}
        containerStyle={styles.buttonSignInContainer}
        textStyle={styles.buttonSignInText}
        onPress={handleSubmit(handleSignIn)}
      >Sign in
      </Button>
      <Button
        activeOpacity={0.8}
        containerStyle={styles.buttonLinkSignUpContainer}
        textStyle={styles.buttonLinkSignUpText}
        onPress={() => navigation.navigate('SignUp')}
      >Go to sign up
      </Button>
    </View>
  );
};

export default React.memo(SignIn);
