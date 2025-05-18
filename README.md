![1000239189](https://github.com/user-attachments/assets/34ce886c-0630-4e5d-a0a7-fdb7d2d2e84b)
Expo App with EAS Deployment
This is a React Native app built with Expo and deployed using Expo Application Services (EAS). This README provides a complete guide to setting up, building, and deploying the app for development and production, including web hosting with EAS. It also addresses common routing issues for web deployments.
Table of Contents

Prerequisites
Project Setup
EAS Configuration
Creating a Development Build
Creating a Production Build
Deploying to EAS Hosting (Web)
Handling Routing Issues
Monitoring and Debugging
Troubleshooting
Contributing

Prerequisites
Before starting, ensure you have the following:

Node.js: Version 18 or higher. Install from nodejs.org.
Expo Account: Sign up at expo.dev.
EAS CLI: Install globally with:npm install -g eas-cli

Verify installation:eas --version


Expo CLI: Install globally with:npm install -g expo-cli


Git: Installed and configured for version control.
Developer Accounts (for production):
Apple Developer Program ($99/year) for iOS App Store submissions.
Google Play Console ($25 one-time fee) for Android submissions.


Project Repository: A GitHub repository with your Expo project.
Expo SDK 53: Ensure your project uses SDK 53. Check package.json:"expo": "^53.0.0"



Project Setup

Clone the Repository:
git clone https://github.com/your-username/your-repo.git
cd your-repo


Install Dependencies:
npm install


Configure app.json:Update app.json with your app’s details:
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "scheme": "yourapp",
    "web": {
      "output": "static",
      "bundler": "metro",
      "spa": true
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}


web.spa: true ensures single-page application (SPA) routing for web deployments, redirecting all paths to index.html.
Increment version for each production release.


Directory Structure:Ensure your app directory includes:

app/_layout.tsx: Defines the root layout with Expo Router’s <Stack />.
app/index.tsx: The home screen.
app/+not-found.tsx: A custom 404 page (see Handling Routing Issues).

Example app/_layout.tsx:
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}

Example app/index.tsx:
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Your App!</Text>
      <Text>Testing Expo Web</Text>
    </View>
  );
}



EAS Configuration

Log in to EAS:
eas login

Verify with:
eas whoami


Initialize EAS:Run:
eas init

This creates an eas.json file with default build profiles:
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}


Configure Credentials:For production builds, set up app signing credentials:

Android:eas credentials -p android

Choose Generate new keystore or provide an existing one.
iOS:eas credentials -p ios

Sign in to your Apple Developer account to generate a provisioning profile and distribution certificate.



Creating a Development Build
Development builds are used for testing on physical devices or simulators.

Run Locally:
npx expo start --dev-client

Scan the QR code with the Expo Go app or run on a simulator.

Create a Development Build:
eas build --profile development --platform all


Monitor the build in the Expo Dashboard.
Install the build on your device or simulator.



Creating a Production Build
Production builds are for app store submissions or web hosting.

Build for App Stores:
eas build --profile production --platform all


For Android, this generates an .aab file (recommended) or .apk if specified.
For iOS, this generates an .ipa file for TestFlight or App Store submission.


Submit to App Stores:
eas submit --platform android
eas submit --platform ios


Ensure your Google Play Console and App Store Connect accounts are set up.
Update version and buildNumber (iOS) or versionCode (Android) in app.json for each submission.



Deploying to EAS Hosting (Web)
EAS Hosting supports deploying web apps with API routes and environment variables.

Export the Web Build:
npx expo export -p web

This generates static files in the dist directory.

Test Locally:
npx expo serve

Open http://localhost:8081 to verify the web app.

Deploy to EAS Hosting:
eas deploy


Select the web platform when prompted.
The deployment URL will be provided (e.g., https://your-app.expo.dev).
Monitor deployment status in the Expo Dashboard.


Configure SPA Routing:Ensure web.spa: true is set in app.json to redirect all paths to index.html for client-side routing. This prevents the "Route Not Found" error.


Handling Routing Issues
To avoid the "The worker has no matching route handler for this path" error, add a custom 404 page and configure SPA routing.

Create app/+not-found.tsx:
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>404 - Page Not Found</Text>
      <Text>Sorry, the requested page does not exist.</Text>
    </View>
  );
}

This renders a custom 404 page for unmatched routes.

Verify SPA Configuration:Confirm web.spa: true in app.json. This ensures all unmatched routes redirect to index.html, allowing Expo Router to handle client-side routing.

Test Routing:After deploying, test non-root paths (e.g., https://your-app.expo.dev/about). If the 404 error persists, check the Expo Dashboard logs or contact Expo support with the Request ID.


Monitoring and Debugging

Expo Dashboard: View build and deployment logs at expo.dev.
Crash Reports: Integrate Sentry or Bugsnag for production monitoring.
Analytics: Use Expo’s analytics tools to track user interactions.
Local Debugging:npx expo start --web

Check the browser console for errors.

Troubleshooting

"Route Not Found" Error:
Ensure app/+not-found.tsx exists.
Verify web.spa: true in app.json.
Redeploy with eas deploy.


Build Failures:
Check logs in the Expo Dashboard.
Run eas build --local to debug locally.


Credentials Issues:
Re-run eas credentials to update signing credentials.


Still Stuck?:
Check the Expo Documentation.
Ask on the Expo Discord or X @expo.



Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

For more details, see the Expo Contributing Guide.

Built with ❤️ using Expo and EAS.
