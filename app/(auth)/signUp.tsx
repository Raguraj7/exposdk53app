import { isClerkAPIResponseError, useSignUp, useSSO } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import { AntDesign, Octicons } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const CLERK_LOGO = require('@/assets/images/clerk-logo.png'); // Replace with your logo

const SignUpScreen: React.FC = () => {
  const { signUp, setActive } = useSignUp();
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const [email, setEmail] = React.useState<string>('');
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const handleSignUpWithProvider = React.useCallback(
    async (strategy: 'oauth_google' | 'oauth_github') => {
      setErrors([]);
      setSubmitting(true);
      try {
        const { createdSessionId } = await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri(),
        });

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        }
      } catch (err: any) {
        if (isClerkAPIResponseError(err)) setErrors(err.errors);
        else
          setErrors([
            { message: err?.message ?? 'SSO Sign-up failed' } as ClerkAPIError,
          ]);
      } finally {
        setSubmitting(false);
      }
    },
    [setActive, startSSOFlow]
  );

  const handleEmailContinue = async () => {
    setErrors([]);
    if (!email) {
      setErrors([
        { message: 'Please enter your email address.' } as ClerkAPIError,
      ]);
      return;
    }
    setSubmitting(true);
    try {
      const attempt = await signUp?.create({ emailAddress: email.trim() });
      if (attempt?.status === 'complete' && setActive) {
        await setActive({ session: attempt.createdSessionId });
      } else if (attempt?.status === 'missing_requirements') {
        setErrors([
          { message: 'Additional verification is required.' } as ClerkAPIError,
        ]);
      }
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      else
        setErrors([
          { message: err?.message ?? 'Email sign-up failed' } as ClerkAPIError,
        ]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignInPress = () => {
    router.push('/(auth)');
    // Redirect to your sign in screen or Clerk's hosted sign in.
    // For Clerk Expo: use navigation or a deep link to your sign-in flow.
  };

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>Sign up to get started</Text>
        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSignUpWithProvider('oauth_google')}
            disabled={submitting}
            accessibilityLabel='Sign up with Google'
          >
            <AntDesign
              name='google'
              size={20}
              color='#222'
              style={{ marginRight: 8 }}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSignUpWithProvider('oauth_github')}
            disabled={submitting}
            accessibilityLabel='Sign up with GitHub'
          >
            <Octicons
              name='mark-github'
              size={20}
              color='#222'
              style={{ marginRight: 8 }}
            />
            <Text style={styles.socialButtonText}>GitHub</Text>
          </TouchableOpacity>
        </View>
        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>
        {/* Email Input */}
        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter your email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            editable={!submitting}
            onChangeText={setEmail}
            placeholderTextColor='#bbb'
            autoCorrect={false}
          />
        </View>
        {errors.length > 0 && (
          <View>
            {errors.map((error, idx) => (
              <Text key={idx} style={styles.error}>
                {error.message}
              </Text>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleEmailContinue}
          disabled={submitting}
          accessibilityLabel='Continue with email'
        >
          {submitting ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <>
              <Text style={styles.continueButtonText}>Continue</Text>
              <AntDesign
                name='arrowright'
                size={18}
                color='#fff'
                style={{ marginLeft: 8 }}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
      {/* Bottom Section */}
      <View style={styles.bottom}>
        <View style={styles.signUpRow}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={handleSignInPress}
            accessibilityLabel='Sign in'
          >
            <Text style={styles.signUpLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.clerkRow}>
          <Text style={styles.securedBy}>Secured by</Text>
          <Image
            source={CLERK_LOGO}
            style={styles.clerkLogo}
            resizeMode='contain'
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#f6f6f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#18181b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    color: '#71717a',
    marginBottom: 18,
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 18,
    gap: 8,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 0,
    backgroundColor: '#fafbfc',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#18181b',
    fontWeight: '500',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ececec',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#b1b1b7',
    fontSize: 14,
    fontWeight: '500',
  },
  inputBlock: {
    width: '100%',
    marginBottom: 12,
  },
  inputLabel: {
    color: '#27272a',
    fontSize: 15,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fafbfc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
    paddingHorizontal: 11,
    fontSize: 16,
    color: '#18181b',
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 2,
    fontSize: 14,
  },
  continueButton: {
    marginTop: 8,
    width: '100%',
    backgroundColor: '#23232b',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottom: {
    width: '90%',
    maxWidth: 380,
    backgroundColor: '#f6f6f7',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: -12,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
  },
  signUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  bottomText: {
    color: '#71717a',
    fontSize: 14,
  },
  signUpLink: {
    color: '#18181b',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  clerkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  securedBy: {
    color: '#b6b8bf',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 3,
  },
  clerkLogo: {
    width: 60,
    height: 18,
  },
});

export default SignUpScreen;
