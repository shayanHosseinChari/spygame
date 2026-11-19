import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import PlayerSetup from "./PlayerSetup";
import SpyRoom from "./SpyRoom";

export default function App() {
  const [players, setPlayers] = useState<string[]>([]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        {players.length === 0 ? (
          <PlayerSetup onReady={setPlayers} />
        ) : (
          <SpyRoom players={players} onExit={() => setPlayers([])} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#09101B",
  },
});
