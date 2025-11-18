// src/hooks/useChatbot.js
import { useState, useCallback } from "react";

const useChatbot = () => {
  // 상태 관리1
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");

  const submitQuestion = useCallback(
    async (prompt) => {
      const userInput = prompt ?? question;
      if (!userInput.trim()) return;
      const userMessage = {
        role: "user",
        content: userInput,
        date: new Date().toString(),
      };

      setChat((prev) => [...prev, userMessage]);
      setLoading(true);
      setQuestion("");

      const currentLevel = level || "중";
      const currentSubject = subject || "REACT";

      const systemInstruction = `면접관 AI이다. 면접 난이도는 "${currentLevel}"이고, 면접 과목은 "${currentSubject}"이다. 사용자의 질문에 '문제:' 형식으로 출제, 사용자가 답할시 정답이면 '정답'으로 알려주고 매응답마다 정답 오답 구분, 해설을 주세요. 다음 문제를 사용자가 질문하기전까지 내지 않는다. 그리고 똑같은 중복 문제를 내지 않는다.`;

      // api 호출 채팅 설정
      const contents = [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...chat.map((msg) => ({
          role: msg.role === "ai" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
        { role: "user", parts: [{ text: userMessage.content }] },
      ];

      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: contents }),
      };

      try {
        const res = await fetch(import.meta.env.VITE_API_URL, requestOption);
        const data = await res.json();
        const aiText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "응답을 받을 수 없습니다.";
        const aiMessage = {
          role: "ai",
          content: aiText,
          date: new Date().toString(),
        };
        setChat((prev) => [...prev, aiMessage]);
      } catch (err) {
        console.error("API Error:", err);
        setChat((prev) => [
          ...prev,
          {
            role: "ai",
            content: "죄송합니다. 질문 처리 중 오류가 발생했습니다.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [question, chat, level, subject]
  );

  return {
    question,
    setQuestion,
    chat,
    setChat,
    loading,
    level,
    setLevel,
    subject,
    setSubject,
    submitQuestion,
  };
};

export default useChatbot;
