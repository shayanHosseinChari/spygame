import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  players: string[];
  onDone: () => void;
};

const places = [
  "فرودگاه",
  "کتابخانه",
  "سینما",
  "رستوران",
  "ایستگاه قطار",
  "موزه",
  "بیمارستان",
  "استادیوم",
];

export default function RoleDeal({ players, onDone }: Props) {
  const [round] = useState(() => ({
    spyIndex: Math.floor(Math.random() * players.length),
    place: places[Math.floor(Math.random() * places.length)],
  }));

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const isSpy = index === round.spyIndex;
  const isLast = index === players.length - 1;

  function hideCard() {
    setVisible(false);

    if (isLast) {
      onDone();
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <View style={s.page}>
      <Text style={s.counter}>
        بازیکن {index + 1} از {players.length}
      </Text>

      <View style={s.card}>
        <Text style={s.name}>{players[index]}</Text>

        {visible ? (
          <>
            <Text style={s.label}>{isSpy ? "نقش تو" : "مکان مشترک"}</Text>
            <Text style={[s.secret, isSpy && s.spy]}>
              {isSpy ? "تو جاسوسی!" : round.place}
            </Text>
            <Text style={s.hint}>
              {isSpy
                ? "از جواب بقیه سعی کن مکان رو حدس بزنی."
                : "به سؤال‌ها جواب بده، اما اسم مکان رو نگو."}
            </Text>
          </>
        ) : (
          <Text style={s.hint}>
            گوشی رو بده به {players[index]}. فقط خودش کارت رو باز کنه.
          </Text>
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        style={s.button}
        onPress={visible ? hideCard : () => setVisible(true)}
      >
        <Text style={s.buttonText}>
          {!visible
            ? "نمایش کارت من"
            : isLast
              ? "پنهان کردن و ورود به میز"
              : "پنهان کردن و تحویل گوشی"}
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, justifyContent: "center", padding: 24, gap: 18 },
  counter: { color: "#C4D9D4", textAlign: "center" },
  card: {
    backgroundColor: "#1B2936",
    borderRadius: 18,
    padding: 24,
    minHeight: 210,
    justifyContent: "center",
    gap: 12,
  },
  name: { color: "#F6D18D", textAlign: "center", fontSize: 22 },
  label: { color: "#C4D9D4", textAlign: "center" },
  secret: {
    color: "#8CE1BB",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  spy: { color: "#FFB1A8" },
  hint: { color: "white", textAlign: "center", lineHeight: 25 },
  button: { backgroundColor: "#28685F", borderRadius: 12, padding: 15 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
