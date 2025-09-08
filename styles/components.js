import { StyleSheet } from "react-native";

export const createComponentStyles = (theme) =>
  StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },

    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      ...theme.shadows.small,
    },

    // Buttons
    primaryButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
    },

    primaryButtonText: {
      color: theme.colors.background,
      ...theme.typography.body,
      fontWeight: "600",
    },

    secondaryButton: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
    },

    // Inputs
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.sm,
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      ...theme.typography.body,
    },

    // Texts
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },

    subtitle: {
      ...theme.typography.h3,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },

    body: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
  });
