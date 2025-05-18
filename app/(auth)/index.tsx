// import { AntDesign } from "@expo/vector-icons";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export interface LoginScreenProps {
//   onSignIn: (email: string, password: string) => Promise<void>;
//   onGoogleSignIn?: () => Promise<void>;
//   onAppleSignIn?: () => Promise<void>;
//   loading?: boolean;
// }

// const LOGO = require("@/assets/images/bluesky-logo.png"); // Replace with your logo

// const LoginScreen: React.FC<LoginScreenProps> = ({
//   onSignIn,
//   onGoogleSignIn,
//   onAppleSignIn,
//   loading = false,
// }) => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [submitting, setSubmitting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSignIn = async () => {
//     setError(null);
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }
//     setSubmitting(true);
//     try {
//       await onSignIn(email.trim(), password);
//     } catch (e: any) {
//       setError(e?.message || "Sign in failed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleSocial = async (fn?: () => Promise<void>) => {
//     if (!fn) return;
//     setSubmitting(true);
//     setError(null);
//     try {
//       await fn();
//     } catch (e: any) {
//       setError(e?.message || "Social sign in failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.screen}
//       behavior={Platform.select({ ios: "padding", android: undefined })}
//     >
//       <View style={styles.container}>
//         <Image source={LOGO} style={styles.logo} resizeMode='contain' />
//         <Text style={styles.title}>Sign in to your account</Text>
//         <Text style={styles.subtitle}>Welcome back! Please login below.</Text>

//         <View style={styles.form}>
//           <TextInput
//             style={styles.input}
//             placeholder='Email address'
//             keyboardType='email-address'
//             autoCapitalize='none'
//             value={email}
//             onChangeText={setEmail}
//             editable={!submitting && !loading}
//             placeholderTextColor='#aaa'
//           />
//           <TextInput
//             style={styles.input}
//             placeholder='Password'
//             secureTextEntry
//             autoCapitalize='none'
//             value={password}
//             onChangeText={setPassword}
//             editable={!submitting && !loading}
//             placeholderTextColor='#aaa'
//           />
//           {error && (
//             <Text style={styles.error} accessibilityLiveRegion='polite'>
//               {error}
//             </Text>
//           )}
//           <TouchableOpacity
//             style={styles.primaryBtn}
//             onPress={handleSignIn}
//             disabled={submitting || loading}
//             accessibilityLabel='Sign in'
//           >
//             {submitting || loading ? (
//               <ActivityIndicator color='#fff' />
//             ) : (
//               <Text style={styles.primaryBtnText}>Sign In</Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         <View style={styles.dividerRow}>
//           <View style={styles.divider} />
//           <Text style={styles.dividerText}>OR</Text>
//           <View style={styles.divider} />
//         </View>

//         <View style={styles.socialRow}>
//           <TouchableOpacity
//             style={styles.socialBtn}
//             onPress={() => handleSocial(onGoogleSignIn)}
//             disabled={submitting || loading}
//             accessibilityLabel='Sign in with Google'
//           >
//             <AntDesign name='google' size={22} color='#ea4335' />
//             <Text style={styles.socialBtnText}>Google</Text>
//           </TouchableOpacity>
//           {Platform.OS === "ios" && (
//             <TouchableOpacity
//               style={styles.socialBtn}
//               onPress={() => handleSocial(onAppleSignIn)}
//               disabled={submitting || loading}
//               accessibilityLabel='Sign in with Apple'
//             >
//               <AntDesign name='apple1' size={22} color='#000' />
//               <Text style={styles.socialBtnText}>Apple</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={styles.footerRow}>
//           <Text style={styles.footerText}>Forgot password?</Text>
//           <TouchableOpacity onPress={() => Alert.alert("Reset link flow")}>
//             <Text style={[styles.footerText, styles.footerLink]}>
//               Reset here
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.footerRow}>
//           <Text style={styles.footerText}>Don't have an account?</Text>
//           <TouchableOpacity onPress={() => Alert.alert("Sign up flow")}>
//             <Text style={[styles.footerText, styles.footerLink]}>Sign up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: "#f8fafc" },
//   container: {
//     flex: 1,
//     padding: 28,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logo: {
//     height: 64,
//     width: 64,
//     marginBottom: 24,
//     borderRadius: 12,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#22223b",
//     letterSpacing: 0.3,
//     marginBottom: 4,
//   },
//   subtitle: {
//     color: "#667085",
//     fontSize: 15,
//     marginBottom: 24,
//   },
//   form: { width: "100%" },
//   input: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#e4e4e7",
//     color: "#22223b",
//   },
//   error: {
//     color: "#d90429",
//     marginBottom: 8,
//     textAlign: "center",
//     fontSize: 14,
//   },
//   primaryBtn: {
//     backgroundColor: "#2563eb",
//     borderRadius: 12,
//     paddingVertical: 14,
//     alignItems: "center",
//     marginTop: 4,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   primaryBtnText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//     letterSpacing: 0.3,
//   },
//   dividerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 12,
//     width: "100%",
//   },
//   divider: { flex: 1, height: 1, backgroundColor: "#e4e4e7" },
//   dividerText: {
//     marginHorizontal: 12,
//     color: "#aaa",
//     fontWeight: "600",
//     fontSize: 13,
//   },
//   socialRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 24,
//     width: "100%",
//     justifyContent: "center",
//   },
//   socialBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderWidth: 1,
//     borderColor: "#e4e4e7",
//     marginHorizontal: 6,
//     elevation: 1,
//   },
//   socialBtnText: {
//     marginLeft: 10,
//     fontSize: 15,
//     fontWeight: "500",
//     color: "#22223b",
//   },
//   footerRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 6,
//     gap: 6,
//   },
//   footerText: { color: "#667085", fontSize: 14 },
//   footerLink: {
//     color: "#2563eb",
//     fontWeight: "bold",
//     marginLeft: 3,
//   },
// });

import { AntDesign, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface LoginScreenProps {
  onEmailContinue: (email: string) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  onGithubSignIn: () => Promise<void>;
  onSignUpPress: () => void;
  loading?: boolean;
}

const CLERK_LOGO = require("@/assets/images/clerk-logo.png"); // Replace with your local asset

const LoginScreen: React.FC<LoginScreenProps> = ({
  onEmailContinue,
  onGoogleSignIn,
  onGithubSignIn,
  onSignUpPress,
  loading = false,
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleEmailContinue = async () => {
    setError(null);
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setSubmitting(true);
    try {
      await onEmailContinue(email.trim());
    } catch (e: any) {
      setError(e?.message || "Failed to continue. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        <Text style={styles.heading}>Sign in to your account</Text>
        <Text style={styles.subheading}>
          Welcome back! Please sign in to continue
        </Text>
        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={onGoogleSignIn}
            disabled={loading || submitting}
            accessibilityLabel='Sign in with Google'
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
            onPress={onGithubSignIn}
            disabled={loading || submitting}
            accessibilityLabel='Sign in with GitHub'
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
            editable={!loading && !submitting}
            onChangeText={setEmail}
            placeholderTextColor='#bbb'
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleEmailContinue}
          disabled={loading || submitting}
          accessibilityLabel='Continue with email'
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <AntDesign
            name='arrowright'
            size={18}
            color='#fff'
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
      {/* Bottom Section */}
      <View style={styles.bottom}>
        <View style={styles.signUpRow}>
          <Text style={styles.bottomText}>Don&apos;t have an account?</Text>
          <TouchableOpacity
            onPress={onSignUpPress}
            accessibilityLabel='Sign up'
          >
            <Text style={styles.signUpLink}>Sign up</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#f6f6f7",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#18181b",
    marginBottom: 8,
    textAlign: "center",
  },
  subheading: {
    fontSize: 15,
    color: "#71717a",
    marginBottom: 18,
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 18,
    gap: 8,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 0,
    backgroundColor: "#fafbfc",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#18181b",
    fontWeight: "500",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ececec",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#b1b1b7",
    fontSize: 14,
    fontWeight: "500",
  },
  inputBlock: {
    width: "100%",
    marginBottom: 12,
  },
  inputLabel: {
    color: "#27272a",
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fafbfc",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingVertical: Platform.OS === "ios" ? 13 : 10,
    paddingHorizontal: 11,
    fontSize: 16,
    color: "#18181b",
  },
  error: {
    color: "#dc2626",
    textAlign: "center",
    marginBottom: 6,
    marginTop: 2,
    fontSize: 14,
  },
  continueButton: {
    marginTop: 8,
    width: "100%",
    backgroundColor: "#23232b",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 8,
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bottom: {
    width: "90%",
    maxWidth: 380,
    backgroundColor: "#f6f6f7",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: -12,
    borderTopWidth: 1,
    borderTopColor: "#ececec",
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  bottomText: {
    color: "#71717a",
    fontSize: 14,
  },
  signUpLink: {
    color: "#18181b",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  clerkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  securedBy: {
    color: "#b6b8bf",
    fontSize: 13,
    fontWeight: "500",
    marginRight: 3,
  },
  clerkLogo: {
    width: 60,
    height: 18,
  },
});

export default LoginScreen;
