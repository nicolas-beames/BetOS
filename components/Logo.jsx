import { Image, StyleSheet } from "react-native";
import Img from "../assets/img/logo.png";
import { useTheme } from "../hooks/useTheme";

const Logo = ({ style, ...props }) => {
    const { styles } = useTheme();

    return (
        <Image
            source={Img}
            style={[styles.img, style]} // mescla o estilo padrão com o que vier de fora
            resizeMode="contain" // mantém proporção da imagem
            {...props} // repassa todos os outros props
        />
    );
};

export default Logo;
