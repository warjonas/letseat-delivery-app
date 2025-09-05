import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signIn } from '@/lib/appwrite';
import * as Sentry from '@sentry/react-native';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignIn = () => {
  const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async () => {
    const { email, password } = form;
    if (!form.email || !form.password)
      return Alert.alert(
        'Oops!',
        'Please enter valid email address and password'
      );

    setisSubmitting(true);

    try {
      //call appwrite sign in fucntion

      await signIn({ email, password });

      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
      Sentry.captureEvent(error);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Dont Have An Account?{' '}
        </Text>
        <Link href={'/sign-up'} className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
