import { useEffect, useState } from "react";
import { shuffle, sampleSize } from "lodash";

const originalDialogues = [
  {
    id: 1,
    context: "You are at a coffee shop. The barista says:",
    npc: "Hello! What would you like to drink?",
    correctOrder: ["I'd", "like", "a", "coffee."],
    shuffled: ["coffee.", "I'd", "a", "like"]
  },
  {
    id: 2,
    context: "You are checking into a hotel. The receptionist says:",
    npc: "Do you have a reservation?",
    correctOrder: ["Yes,", "I", "have", "a", "reservation."],
    shuffled: ["a", "reservation.", "have", "Yes,", "I"]
  },
{
  id: 23,
  context: "You are in a job interview. The interviewer asks:",
  npc: "Can you describe your experience in cybersecurity?",
  correctOrder: ["Yes,", "I", "have", "three", "years", "of", "experience", "in", "cybersecurity."],
  shuffled: ["experience", "of", "Yes,", "years", "in", "have", "cybersecurity.", "three", "I"]
},
{
  id: 24,
  context: "The interviewer asks:",
  npc: "What security tools are you familiar with?",
  correctOrder: ["I", "am", "familiar", "with", "Wireshark", "and", "Nmap."],
  shuffled: ["Nmap.", "familiar", "I", "am", "and", "Wireshark", "with"]
},
{
  id: 25,
  context: "The interviewer asks:",
  npc: "How do you handle a data breach?",
  correctOrder: ["First,", "I", "contain", "the", "breach", "and", "then", "investigate", "the", "incident."],
  shuffled: ["incident.", "contain", "the", "First,", "breach", "then", "the", "and", "investigate", "I"]
},
{
  id: 26,
  context: "The interviewer asks:",
  npc: "Have you ever performed a vulnerability assessment?",
  correctOrder: ["Yes,", "I", "have", "performed", "several", "vulnerability", "assessments."],
  shuffled: ["performed", "vulnerability", "I", "Yes,", "assessments.", "several", "have"]
},
{
  id: 27,
  context: "The interviewer asks:",
  npc: "Why do you want to work in our company?",
  correctOrder: ["I", "admire", "your", "focus", "on", "cybersecurity", "innovation."],
  shuffled: ["focus", "your", "I", "on", "innovation.", "cybersecurity", "admire"]
},
{
  id: 28,
  context: "The interviewer asks:",
  npc: "How do you stay updated on security trends?",
  correctOrder: ["I", "read", "blogs,", "attend", "webinars,", "and", "follow", "experts", "on", "LinkedIn."],
  shuffled: ["on", "experts", "blogs,", "I", "webinars,", "read", "and", "attend", "LinkedIn.", "follow"]
},
{
  id: 29,
  context: "The interviewer asks:",
  npc: "Can you explain what a firewall does?",
  correctOrder: ["A", "firewall", "monitors", "and", "controls", "network", "traffic."],
  shuffled: ["controls", "network", "A", "traffic.", "firewall", "and", "monitors"]
},
{
  id: 30,
  context: "The interviewer asks:",
  npc: "What is your approach to risk management?",
  correctOrder: ["I", "identify", "risks,", "assess", "them,", "and", "apply", "appropriate", "controls."],
  shuffled: ["controls.", "I", "them,", "apply", "appropriate", "identify", "and", "risks,", "assess"]
},
{
  id: 31,
  context: "The interviewer asks:",
  npc: "Tell me about a time you solved a critical issue.",
  correctOrder: ["I", "detected", "malware", "in", "the", "network", "and", "removed", "it", "quickly."],
  shuffled: ["in", "the", "detected", "and", "network", "I", "it", "removed", "quickly.", "malware"]
},
{
  id: 32,
  context: "The interviewer asks:",
  npc: "Do you have any certifications?",
  correctOrder: ["Yes,", "I", "have", "a", "CompTIA", "Security+", "certification."],
  shuffled: ["certification.", "Security+", "have", "a", "I", "Yes,", "CompTIA"]
},
{
  id: 40,
  context: "You are asked about your identity in a dark alley:",
  npc: "Who are you?",
  correctOrder: ["I'm", "Batman."],
  shuffled: ["Batman.", "I'm"]
},
{
  id: 41,
  context: "Your friend asks you about your plan for the future:",
  npc: "What are you going to do now?",
  correctOrder: ["I'm", "going", "to", "make", "him", "an", "offer", "he", "can't", "refuse."],
  shuffled: ["he", "make", "refuse.", "an", "I'm", "offer", "can't", "going", "to", "him"]
},
{
  id: 42,
  context: "Someone says you're too afraid to try:",
  npc: "Aren’t you scared?",
  correctOrder: ["Courage", "is", "not", "the", "absence", "of", "fear."],
  shuffled: ["absence", "is", "Courage", "of", "fear.", "not", "the"]
},
{
  id: 43,
  context: "A friend asks what you believe about reality:",
  npc: "Do you believe what you see is real?",
  correctOrder: ["There", "is", "no", "spoon."],
  shuffled: ["no", "is", "spoon.", "There"]
},
{
  id: 44,
  context: "Someone asks what life is like:",
  npc: "What is life to you?",
  correctOrder: ["Life", "is", "like", "a", "box", "of", "chocolates."],
  shuffled: ["box", "Life", "is", "like", "chocolates.", "of", "a"]
},
{
  id: 45,
  context: "You are facing a mission. Your commander says:",
  npc: "Are you ready for this?",
  correctOrder: ["May", "the", "Force", "be", "with", "you."],
  shuffled: ["with", "May", "you.", "Force", "the", "be"]
},
{
  id: 46,
  context: "A stranger doubts you will return:",
  npc: "Will you come back?",
  correctOrder: ["I'll", "be", "back."],
  shuffled: ["back.", "I'll", "be"]
},
{
  id: 47,
  context: "You’re asked why you are doing something difficult:",
  npc: "Why are you doing this?",
  correctOrder: ["Because", "it's", "the", "right", "thing", "to", "do."],
  shuffled: ["it's", "Because", "to", "do.", "thing", "the", "right"]
},
{
  id: 48,
  context: "Your partner says you never give up:",
  npc: "Do you ever quit?",
  correctOrder: ["I'm", "not", "gonna", "let", "him", "down."],
  shuffled: ["let", "gonna", "down.", "him", "I'm", "not"]
},
{
  id: 49,
  context: "Someone asks how you define freedom:",
  npc: "What does freedom mean to you?",
  correctOrder: ["Free", "your", "mind."],
  shuffled: ["your", "Free", "mind."]
},
{
  id: 50,
  context: "You’re at a hotel. The clerk says:",
  npc: "Do you want a room with a view?",
  correctOrder: ["Yes,", "I", "would", "like", "a", "room", "with", "a", "view."],
  shuffled: ["view.", "like", "a", "room", "I", "a", "with", "would", "Yes,"]
},
{
  id: 51,
  context: "You’re at the airport. The staff asks:",
  npc: "Can you show me your passport?",
  correctOrder: ["Sure,", "here", "is", "my", "passport."],
  shuffled: ["passport.", "here", "Sure,", "is", "my"]
},
{
  id: 52,
  context: "Your friend asks about your weekend:",
  npc: "What did you do last weekend?",
  correctOrder: ["I", "went", "to", "the", "beach", "with", "my", "family."],
  shuffled: ["beach", "I", "with", "my", "family.", "went", "the", "to"]
},
{
  id: 53,
  context: "In a job interview. The manager asks:",
  npc: "Why should we hire you?",
  correctOrder: ["Because", "I", "have", "the", "skills", "you", "are", "looking", "for."],
  shuffled: ["skills", "you", "Because", "I", "for.", "looking", "the", "are", "have"]
},
{
  id: 54,
  context: "At the pharmacy. The pharmacist says:",
  npc: "How can I help you today?",
  correctOrder: ["I", "need", "some", "medicine", "for", "a", "headache."],
  shuffled: ["some", "medicine", "for", "a", "headache.", "need", "I"]
},
{
  id: 55,
  context: "At the doctor’s office. The nurse asks:",
  npc: "When did the symptoms start?",
  correctOrder: ["They", "started", "about", "three", "days", "ago."],
  shuffled: ["ago.", "They", "three", "days", "started", "about"]
},
{
  id: 56,
  context: "On a tour. The guide says:",
  npc: "Do you have any questions?",
  correctOrder: ["Yes,", "how", "old", "is", "this", "building?"],
  shuffled: ["is", "this", "Yes,", "building?", "how", "old"]
},
{
  id: 57,
  context: "You’re helping a classmate. They ask:",
  npc: "How do you solve this problem?",
  correctOrder: ["First,", "you", "need", "to", "divide", "both", "sides", "by", "two."],
  shuffled: ["divide", "to", "First,", "by", "sides", "need", "both", "two.", "you"]
},
{
  id: 58,
  context: "During a presentation. Someone asks:",
  npc: "Can you explain that again?",
  correctOrder: ["Yes,", "I", "can", "go", "over", "it", "one", "more", "time."],
  shuffled: ["Yes,", "over", "can", "go", "it", "I", "one", "more", "time."]
},
{
  id: 59,
  context: "You are meeting someone new:",
  npc: "Where are you from?",
  correctOrder: ["I’m", "from", "a", "small", "town", "in", "the", "north."],
  shuffled: ["the", "from", "I’m", "town", "north.",]
}
  // 나머지 문장들도 여기에 계속 추가 가능
];

const SpeechRecognition =
  typeof window !== "undefined" &&
  ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

export default function EnglishOrderGame() {
  const totalQuestions = 10;
  const [dialogues, setDialogues] = useState(() => sampleSize(originalDialogues, totalQuestions));
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintCount, setHintCount] = useState(0);
  const [hintIndexes, setHintIndexes] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState<{ npc: string; correctOrder: string[] }[]>([]);
  const [recognizedText, setRecognizedText] = useState<string>("");

  const current = dialogues[step];

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const googleVoice = voices.find(v => v.name === "Google US English");
    if (!googleVoice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = googleVoice;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleWordClick = (word: string) => {
    if (isCorrect !== null) return;
    if (selected.includes(word)) {
      setSelected(selected.filter(w => w !== word));
    } else {
      setSelected([...selected, word]);
    }
  };

  const checkAnswer = () => {
    if (selected.join(" ") === current.correctOrder.join(" ")) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
      setIncorrectAnswers([...incorrectAnswers, { npc: current.npc, correctOrder: current.correctOrder }]);
    }
  };

  const next = () => {
    if (step + 1 >= totalQuestions) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
    setSelected([]);
    setIsCorrect(null);
    setHintCount(0);
    setHintIndexes([]);
    setRecognizedText("");
  };

  const showHint = () => {
    const maxHints = current.correctOrder.length;
    if (hintCount < maxHints) {
      const availableIndexes = current.correctOrder.map((_, i) => i).filter(i => !hintIndexes.includes(i));
      const newHints = sampleSize(availableIndexes, 1);
      setHintIndexes([...hintIndexes, ...newHints]);
      setHintCount(hintCount + 1);
    }
  };

  const handleSpeechInput = () => {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setRecognizedText(text);
      const words = text.trim().split(" ");
      setSelected(words);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
    };
    recognition.start();
  };

  if (finished) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center", fontSize: "2rem" }}>
          <p>🎉 You've completed the quiz!</p>
          <p>Your score: {score} / {totalQuestions}</p>

          {incorrectAnswers.length > 0 && (
            <div style={{ marginTop: "24px", fontSize: "1.2rem", textAlign: "left" }}>
              <p>🔁 Review your mistakes:</p>
              <ul>
                {incorrectAnswers.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "12px" }}>
                    <strong>Q:</strong> {item.npc}<br />
                    <strong>Correct:</strong> {item.correctOrder.join(" ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", textAlign: "center", fontSize: "2rem" }}>
        <p style={{ marginBottom: 0 }}>Question {step + 1} of {totalQuestions}</p>
        <p><strong style={{ color: "green" }}>{current.context}</strong></p>
        <p style={{ color: "red" }}>{current.npc}</p>
        <button onClick={() => speak(current.npc)} style={{ fontSize: "1rem", marginBottom: "16px" }}>🔊 Listen to Question</button>

        <div style={{ marginTop: "16px" }}>
          {current.shuffled.map((word: string, index: number) => (
            <button
              key={index}
              onClick={() => handleWordClick(word)}
              style={{
                margin: "4px",
                padding: "6px 12px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: selected.includes(word) ? "#d0f0ff" : "#f0f0f0",
                fontSize: "1rem"
              }}
            >
              {word}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "16px", color: "blue" }}>
          <strong>Your sentence:</strong> {selected.join(" ")}
        </div>
        {selected.length > 0 && (
          <button onClick={() => speak(selected.join(" "))} style={{ fontSize: "1rem", marginTop: "8px" }}>🔊 Listen to Answer</button>
        )}

        <div style={{ marginTop: "12px" }}>
          <button onClick={checkAnswer} style={{ fontSize: "1rem", marginRight: "8px" }}>Check</button>
          <button onClick={showHint} style={{ fontSize: "1rem", marginRight: "8px" }}>💡 Show Hint</button>
          <button onClick={handleSpeechInput} style={{ fontSize: "1rem" }}>🎤 Speak Answer</button>
        </div>

        {recognizedText && (
          <div style={{ marginTop: "12px", fontSize: "1rem", color: "gray" }}>
            Recognized: "{recognizedText}"
          </div>
        )}

        {isCorrect !== null && (
          <div style={{ marginTop: "12px", color: isCorrect ? "green" : "red" }}>
            {isCorrect ? "Correct! 🎉" : "Oops! Try again."}
            <br />
            <button onClick={next} style={{ marginTop: "6px", fontSize: "1rem" }}>Next</button>
          </div>
        )}

        {hintCount > 0 && (
          <div style={{ marginTop: "24px", fontSize: "1.2rem" }}>
            Hint: {current.correctOrder.map((word, i) => (
              hintIndexes.includes(i) ? (
                <span key={i} style={{ marginRight: "8px", color: "green" }}>{word}</span>
              ) : (
                <span key={i} style={{ marginRight: "8px", color: "gray" }}>___</span>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
