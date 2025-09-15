import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const Profile = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/login'); // 👈 redirect user after logout
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl mb-4">Profile</Text>
      <Button title="Sign Out" onPress={()=>signOut()} />
    </View>
  );
};

export default Profile;