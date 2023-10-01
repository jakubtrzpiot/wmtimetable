#!/bin/bash

cd android && ./gradlew assembleRelease
cd .. && cp android/app/build/outputs/apk/release/app-release.apk ./build/plan-wm-latest.apk
printf "<---Build finished!--->\nYou can find the apk in build/plan-wm-latest.apk"