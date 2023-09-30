cd android && ./gradlew assembleRelease
cd .. && cp android/app/build/outputs/apk/release/app-release.apk ./build/app-release.apk
printf "<---Build finished!--->\nYou can find the apk in build/app-release.apk"