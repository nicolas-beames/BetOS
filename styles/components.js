import { StyleSheet } from "react-native";

export const createComponentStyles = (theme) =>
    StyleSheet.create({
        // Containers
        container: {
            backgroundColor: theme.colors.surface,
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.md,
            ...theme.typography.body,
        },
        card: {
            backgroundColor: theme.colors.surface,
            borderColor: theme.defaultColors.grey300,
            borderWidth: 1,
            borderRadius: theme.borderRadius.md,
            margin: theme.spacing.sm,
            padding: theme.spacing.md,
            ...theme.shadows.small,
        },

        cardTitle: {
            color: theme.defaultColors.grey700,
            paddingBottom: 10,
            ...theme.typography.headline4,
        },

        cardText: {
            color: theme.defaultColors.grey600,
            ...theme.typography.paragraph,
        },

        // Buttons
        button: {
            alignItems: "center",
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.md,
            height: 37,
            justifyContent: "center",
        },

        buttonText: {
            paddingHorizontal: theme.spacing.md,
            color: theme.colors.surface,
            ...theme.typography.button,
        },

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

        // Labels
        label: {
            color: theme.defaultColors.grey600,
            ...theme.typography.headline6,
        },

        // Inputs
        input: {
            borderWidth: 1,
            borderColor: theme.defaultColors.grey300,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.surface,
            color: theme.defaultColors.grey900,
            width: 208,
            ...theme.typography.paragraph,
        },

        // Texts
        title: {
            ...theme.typography.h2,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
            marginLeft: theme.spacing.sm,
        },

        // Links
        link: {
            fontSize: 24,
            fontFamily: "LouisCondensedRegular",
            color: "003155",
        },

        // Img
        img: { padding: 20, margin: 10 },

        subtitle: {
            ...theme.typography.headline4,
            color: theme.defaultColors.grey700,
            marginBottom: theme.spacing.xs,
        },

        body: {
            ...theme.typography.body,
            color: theme.colors.text,
        },
    });
