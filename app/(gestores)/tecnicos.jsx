import React, { useState } from "react";
import { FlatList, View, Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../hooks/useTheme";

import ThemedView from "../../components/ThemedView";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedInput from "../../components/ThemedInput";

const Clientes = () => {
  const [user, setUser] = useState("");

  const DATA_TECNICOS = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Alexandre Massaro',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Filipe Zanin',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Enio Massao',
    },
  ];

  const Item = ({ title }) => (
    <ThemedView style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    }}>
        <ThemedText style={{ paddingTop: 20, paddingBottom: 20 }}>
          {title}
        </ThemedText>      
        <ThemedButton
        text="Editar"
        style={{ width: 100 }}
        action={() => {
            console.log(`Editando ${title}`);
        }}
      />
    </ThemedView>
  );

  const { styles } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        alignSelf:'center',
        width: '100%'
      }}>
        <ThemedText title={true} >OS</ThemedText>

        <ThemedText title={true} style={{ backgound: '#black'}} >
          <Link href="/cadastroTecnico" >
            Novo Técnico
          </Link>
        </ThemedText>
      </ThemedView>

      <ThemedView style={{width: '100%', alignSelf:'center'}}>
        <ThemedInput
          label={"Pesquisa"}
          value={user} // Adicione o value para controlar o input
          onChangeText={setUser}
          placeholder={"Digite o nome do técnico"}
        />

        <FlatList 
          data={DATA_TECNICOS} 
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 10 // Adiciona espaço no topo da lista
          }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
        </ThemedView>
    </SafeAreaView>
  );
};

export default Clientes;
