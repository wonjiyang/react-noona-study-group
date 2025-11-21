// src/hooks/useChatbot.js
import { useState, useCallback } from "react";

const useChatbot = () => {
  // 상태 관리
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
        date: new Date().toLocaleString("ko-KR"),
        theme: subject,
        level: level,
      };

      setChat((prev) => [...prev, userMessage]);
      setLoading(true);
      setQuestion("");

      // 랜덤 난이도/과목 설정
      const ranLe = ["상", "중", "하"];
      const ranSub = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
      const randomLevel = ranLe[Math.floor(Math.random() * ranLe.length)];
      const randomSubject = ranSub[Math.floor(Math.random() * ranSub.length)];

      const currentLevel = level || randomLevel;
      const currentSubject = subject || randomSubject;

      // AI 답변 포맷
      const aiRes = `
      당신은 면접관이고 ${currentLevel} 난이도와 ${currentSubject}의 면접 질문을 해준다
      면접자가 면접관 질문에 답변을하면 다음 형식으로만 답변한다:
                     정답여부: 정답 시 정답 오답 시 오답
                     난이도: ${currentLevel}
                     테마: ${currentSubject} 
                     질문: 면접관이 냈던 질문
                     답변: 면접관의 해설
                     중복 문제는 내지 않는다
                     텍스트는 200자 내로 제한한다
                     면접자 질문에 꼬리물기 질문하지 않는다
                     면접자가 면접질문을 하기 전까지 면접 질문하지 않는다`;

      const hintInstruction =
        "면접 문제에 대한 힌트를 아주 간단히 제공한다. 문제를 직접 말하지 않는다.";

      let systemInstruction;

      if (userInput.includes("힌트")) {
        systemInstruction = hintInstruction;
      } else {
        systemInstruction = aiRes;
      }

      // 채팅 구성
      const contents = [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...chat.map((msg) => ({
          role: msg.role === "ai" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
        { role: "user", parts: [{ text: userMessage.content }] },
      ];

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      };

      try {
        const res = await fetch(apiUrl, requestOption);
        const data = await res.json();

        const aiText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "응답을 받을 수 없습니다.";

        const aiMessage = {
          role: "ai",
          content: aiText,
          date: new Date().toLocaleString("ko-KR"),
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

  // ✔ AI 답변 정리
  const answers = chat
    .filter(
      (msg) =>
        msg.role === "ai" &&
        msg.content.includes("정답여부:") &&
        msg.content.includes("난이도:")
    )
    .map((msg) => {
      const lines = msg.content.split(/\n/).map((line) => line.trim());
      const obj = {};

      lines.forEach((line) => {
        if (line.startsWith("정답여부:"))
          obj.answercheck = line.replace("정답여부:", "").trim();
        else if (line.startsWith("질문:"))
          obj.question = line.replace("질문:", "").trim();
        else if (line.startsWith("답변:"))
          obj.answer = line.replace("답변:", "").trim();
        else if (line.startsWith("난이도:"))
          obj.level = line.replace("난이도:", "").trim();
        else if (line.startsWith("테마:"))
          obj.subject = line.replace("테마:", "").trim();
      });

      obj.date = new Date(msg.date).toLocaleString("ko-KR");
      return obj;
    });

  return {
    answers,
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
