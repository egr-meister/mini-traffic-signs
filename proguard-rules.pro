# Mini Traffic Signs - ProGuard / R8 rules
#
# These rules are used ONLY after a non-minified release build has been
# verified to launch successfully (see README "Obfuscation" section).
# When enabling minify, copy this file into android/app/proguard-rules.pro
# (the CI workflow does this automatically after `expo prebuild`).
#
# Keep React Native + Hermes runtime safe. Do not add risky third-party
# obfuscation libraries.

# --- React Native core ---
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}
-keepclassmembers,allowobfuscation class * {
    @com.facebook.proguard.annotations.KeepGettersAndSetters *;
}

# --- Hermes ---
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# --- React Native bridge / JNI ---
-keepclassmembers class * {
    native <methods>;
}

# --- React Navigation / Screens ---
-keep class com.swmansion.** { *; }

# --- Expo modules ---
-keep class expo.modules.** { *; }

# Keep annotations used by reflection-based native modules.
-keepattributes *Annotation*, Signature, InnerClasses, EnclosingMethod
