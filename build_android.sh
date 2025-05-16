npm run build
npx cap sync
cd android/
sed -i '' 's/VERSION_21/VERSION_17/g' app/capacitor.build.gradle
./gradlew clean
./gradlew assembleDebug   