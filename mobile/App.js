import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

export default function App() {
  const [leagueCode, setLeagueCode] = useState('');
  const [leagueData, setLeagueData] = useState(null);

  const fetchLeague = async () => {
    try {
      const resp = await fetch(`http://localhost:4000/league/${leagueCode}`);
      const data = await resp.json();
      setLeagueData(data);
    } catch (err) {
      alert('Error fetching league');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fantasy FPL Mini League</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter League Code"
        value={leagueCode}
        onChangeText={setLeagueCode}
      />
      <Button title="Fetch League" onPress={fetchLeague} />
      {leagueData && leagueData.standings && (
        <FlatList
          data={leagueData.standings.results}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>{item.player_name} - {item.total} pts</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16 },
  row: { padding: 8, borderBottomWidth: 1 }
});
