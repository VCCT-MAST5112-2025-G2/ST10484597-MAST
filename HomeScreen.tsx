import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuItem } from "../types";
import { getAveragePrices } from "../utils";

export default function HomeScreen({ navigation }: any) {
const [menu, setMenu] = useState<MenuItem[]>([]);
const [averages, setAverages] = useState<Record<string, number>>({});

const loadMenu = async () => {
const data = await AsyncStorage.getItem("menuItems");
const parsed = data ? JSON.parse(data) : [];
setMenu(parsed);
const avg = getAveragePrices();
setAverages(avg);
};

useEffect(() => {
const unsubscribe = navigation.addListener("focus", loadMenu);
return unsubscribe;
}, [navigation]);

return (
<View style={styles.container}>
<Text style={styles.title}>Christoffel's Menu</Text>
<Text>Total Dishes: {menu.length}</Text>

<FlatList
data={menu}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<View style={styles.card}>
<Text style={styles.dish}>{item.name}</Text>
<Text>{item.description}</Text>
<Text>Course: {item.course}</Text>
<Text>Price: R{item.price}</Text>
</View>
)}
/>

<Text style={styles.avgTitle}>Average Prices</Text>
{Object.keys(averages).map(course => (
<Text key={course}>
{course}: R{averages[course].toFixed(2)}
</Text>
))}

<Button title="Manage Menu" onPress={() => navigation.navigate("Manage Menu")} />
<Button title="Guest Filter" onPress={() => navigation.navigate("Guest Filter")} />
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 20, backgroundColor: "#fff" },
title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
dish: { fontSize: 18, fontWeight: "500" },
card: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginVertical: 5 },
avgTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
});
