import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// import GuestOnly from "../../components/auth/GuestOnly";

const AuthLayout = () => {
  return (
    <>
      <StatusBar value="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default AuthLayout;
