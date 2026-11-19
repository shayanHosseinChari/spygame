import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = { onReady: (players: string[]) => void };

export default function PlayerSetup({ onReady }: Props) {
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const canStart = players.length >= 3 && !name.trim();

  function addPlayer() {
    const clean = name.trim().replace(/\s+/g, " ");
    if (!clean) return setError("Enter a name first.");
    if (players.some((p) => p.toLowerCase() === clean.toLowerCase())) {
      return setError("That name is taken. Try a nickname.");
    }
    setPlayers((list) => [...list, clean]);
    setName("");
    setError("");
  }

  return (
    <ScrollView
      style={s.page}
      contentContainerStyle={s.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={s.mast}>
        <Text style={s.brand}>LifeLands</Text>
        <Text style={s.serial}>PRIVATE INTELLIGENCE CLUB</Text>
      </View>
      <Text style={s.title}>Spy Room</Text>
      <Text style={s.label}>Who’s playing?</Text>
      <Text style={s.note}>
        Add at least three players. You’ll pass one phone around the table.
      </Text>
      <TextInput
        style={s.input}
        value={name}
        placeholder="Name or nickname"
        placeholderTextColor="#95A5AA"
        accessibilityLabel="Player name"
        maxLength={24}
        returnKeyType="done"
        onSubmitEditing={addPlayer}
        onChangeText={(v) => {
          setName(v);
          setError("");
        }}
      />
      <Pressable
        style={s.button}
        accessibilityRole="button"
        onPress={addPlayer}
      >
        <Text style={s.btnText}>Add player</Text>
      </Pressable>
      {error ? <Text style={s.error}>{error}</Text> : null}
      {players.map((p, i) => (
        <View style={s.row} key={p}>
          <Text style={s.player}>
            {i + 1}. {p}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remove ${p}`}
            hitSlop={8}
            onPress={() => setPlayers((list) => list.filter((v) => v !== p))}
          >
            <Text style={s.error}>Remove</Text>
          </Pressable>
        </View>
      ))}
      <Pressable
        disabled={!canStart}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canStart }}
        style={[s.button, !canStart && s.disabled]}
        onPress={() => {
          Keyboard.dismiss();
          onReady(players);
        }}
      >
        <Text style={s.btnText}>Deal cards ({players.length})</Text>
      </Pressable>
      {players.length >= 3 && name.trim() ? (
        <Text style={s.note}>Add or clear the name above before dealing.</Text>
      ) : null}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  brand: {
    color: "#e8c98b",
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 34,
  },
  serial: { color: "#cfbb93", letterSpacing: 2, fontSize: 11 },
  mast: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#806b45",
    backgroundColor: "#182526",
    borderRadius: 8,
    gap: 4,
  },
  page: { flex: 1, backgroundColor: "#09101b" },
  content: { direction: "ltr", padding: 22, gap: 14 },
  title: { fontSize: 32, color: "#f6d18d", fontWeight: "bold" },
  label: { fontSize: 22, color: "white" },
  note: { color: "#c4d9d4", lineHeight: 22 },
  input: {
    textAlign: "left",
    backgroundColor: "#1b2936",
    color: "white",
    borderRadius: 10,
    padding: 12,
  },
  button: { borderRadius: 12, padding: 14, backgroundColor: "#28685f" },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold" },
  disabled: { opacity: 0.45 },
  error: { color: "#ffb1a8" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#1b2936",
  },
  player: { flex: 1, color: "white" },
});
