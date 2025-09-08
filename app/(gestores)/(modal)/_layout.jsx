import { Stack } from "expo-router";
const Modal = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="cadastroTecnico"
        options={{ presentation: "modal", transparentModal: true }}
      />
    </Stack>
  );
};

export default Modal;
