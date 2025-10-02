import React, { useState } from "react";
import { FlatList, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../hooks/useTheme";

import ThemedView from "../../components/ThemedView";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedInput from "../../components/ThemedInput";

const TechnicianChart = ({ data, title = "Estatísticas dos Técnicos", height = 200 }) => {
  const { styles } = useTheme();
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <ThemedView style={{
      marginVertical: 20,
      padding: 15,
      borderRadius: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }}>
      <ThemedText style={{ 
        fontSize: 16, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 15 
      }}>
        {title}
      </ThemedText>

      {/* Container do Gráfico */}
      <View style={{
        height: height,
        position: 'relative',
        paddingBottom: 30,
      }}>
        {/* Container das Barras */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: height - 30,
          paddingHorizontal: 10,
        }}>
          {data.map((item, index) => {
            const barHeight = maxValue > 0 ? (item.value / maxValue) * (height - 60) : 10;
            const colors = ['#4A90E2', '#50C878', '#FF6B6B', '#FFD93D', '#6C5CE7', '#A29BFE'];
            
            return (
              <View key={index} style={{
                alignItems: 'center',
                flex: 1,
                maxWidth: 80,
              }}>
                {/* Valor acima da barra */}
                <ThemedText style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                  {item.value}
                </ThemedText>
                
                {/* Barra */}
                <View style={{
                  width: 30,
                  height: Math.max(barHeight, 10),
                  backgroundColor: colors[index % colors.length],
                  borderRadius: 4,
                  marginBottom: 8,
                }} />
                
                {/* Label */}
                <ThemedText style={{
                  fontSize: 10,
                  textAlign: 'center',
                  lineHeight: 12,
                }}>
                  {item.label}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>
    </ThemedView>
  );
};

const SimplePieChart = ({ data, title = "Distribuição" }) => {
  const { styles } = useTheme();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#4A90E2', '#50C878', '#FF6B6B', '#FFD93D', '#6C5CE7', '#A29BFE'];

  return (
    <ThemedView style={{
      marginVertical: 10,
      padding: 15,
      borderRadius: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }}>
      <ThemedText style={{ 
        fontSize: 16, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 15 
      }}>
        {title}
      </ThemedText>

      {data.map((item, index) => {
        const percentage = total > 0 ? (item.value / total) * 100 : 0;
        return (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            paddingHorizontal: 10,
          }}>
            <View style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: colors[index % colors.length],
              marginRight: 10,
            }} />
            <View style={{ flex: 1 }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <ThemedText style={{ fontSize: 14 }}>
                  {item.label}
                </ThemedText>
                <ThemedText style={{ fontSize: 12, fontWeight: 'bold' }}>
                  {percentage.toFixed(1)}%
                </ThemedText>
              </View>
              {/* Barra de progresso visual */}
              <View style={{
                height: 4,
                backgroundColor: '#E0E0E0',
                borderRadius: 2,
                marginTop: 4,
              }}>
                <View style={{
                  width: `${percentage}%`,
                  height: 4,
                  backgroundColor: colors[index % colors.length],
                  borderRadius: 2,
                }} />
              </View>
            </View>
          </View>
        );
      })}
    </ThemedView>
  );
};

const Clientes = () => {
  const [user, setUser] = useState("");

  const DATA_TECNICOS = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Alexandre',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Filipe',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Nicoas',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d71',
      title: 'Enio',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Leonardo',
    },
  ];

  const ATENDIMENTO_TECNICOS = [
    { label: 'Alexandre', value: 25 },
    { label: 'Filipe', value: 40 },
    { label: 'Nicolas', value: 32 },
    { label: 'Leonardo', value: 32 },
  ];

  const STATUS_SERVICOS = [
    { label: 'Concluídos', value: 75 },
    { label: 'Em Andamento', value: 60 },
    { label: 'Pendentes', value: 15 },
  ];

  const Item = ({ title }) => (
    <ThemedView style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      borderRadius: 8,
      elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,padding: 10
    }}>
        <ThemedText>
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

  const cadastrarTecnico = (msg) => {
    console.log(msg);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          alignSelf:'center',
          width: '100%'
        }}>
          <ThemedText title={true} >Técnicos</ThemedText>

          <ThemedButton
          text="+"
          style={{ width: 50 }}
          action={() => {
              cadastrarTecnico('cadastrar')
          }}
          />
        </ThemedView>

        <ThemedView style={{width: '100%', alignSelf:'flex-start'}}>
          <ThemedInput
            label={"Pesquisa"}
            value={user}
            onChangeText={setUser}
            placeholder={"Digite o nome do técnico"}
          />

          <FlatList 
            data={DATA_TECNICOS} 
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{
            paddingBottom: 20,
            paddingTop: 10
            }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />

          <TechnicianChart 
            data={ATENDIMENTO_TECNICOS} 
            title="Atendimentos por Técnico" 
            height={100}
          />
          
          <SimplePieChart 
            data={STATUS_SERVICOS} 
            title="Status dos Serviços"
          />
          
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Clientes;