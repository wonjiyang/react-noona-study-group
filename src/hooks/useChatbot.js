// src/hooks/useChatbot.js
import { useState, useEffect } from 'react';
import { useQuestionStore } from '../store/useQuestionStore';

const normalizeQuestion = (str) => {
  if (!str) return '';
  let normalized = str.replace(/\s/g, '');
  return normalized.toLowerCase();
};

const stringToHash = (str) => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32bit integer로 변환
  }
  return hash.toString();
};

const useChatbot = () => {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');

  const { addQuestions } = useQuestionStore();

  const ranLevels = ['상', '중', '하'];
  const ranSubjects = ['HTML', 'CSS', 'JAVASCRIPT', 'REACT'];

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const submitQuestion = async (prompt) => {
    const userInput = prompt ?? question;
    if (!userInput.trim()) return;

    // 사용자 메시지 생성
    const userMessage = {
      role: 'user',
      content: userInput,
      date: new Date().toISOString(),
      theme: subject,
      level: level,
    };

    setChat((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion('');

    const currentLevel = level === '' ? getRandom(ranLevels) : level;
    const currentSubject = subject === '' ? getRandom(ranSubjects) : subject;

    const baseInstruction = `
      당신은 면접관이고 ${currentLevel} 난이도와 ${currentSubject}의 면접 질문을 해준다.
      면접자가 면접관 질문에 답변하면 다음 형식으로만 답변한다:
      정답여부: 정답 또는 오답
      난이도: ${currentLevel}
      테마: ${currentSubject}
      질문: 면접관이 냈던 질문
      답변: 해설(포기 시에도 제공)
      중복 문제는 내지 않는다.
      텍스트는 200자 내로 제한한다.
      꼬리질문하지 않는다.
      면접자가 질문을 하기 전까지 새로운 질문을 내지 않는다.
    `;

    const hintInstruction = '면접 문제에 대한 힌트를 아주 간단히 제공한다. 문제를 직접 말하지 않는다.';

    const systemInstruction = userInput.includes('힌트') ? hintInstruction : baseInstruction;

    const contents = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      ...chat.map((msg) => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
      { role: 'user', parts: [{ text: userMessage.content }] },
    ];

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });

      const data = await res.json();

      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 받을 수 없습니다.';

      const aiMessage = {
        role: 'ai',
        content: aiText,
        date: new Date().toISOString(),
      };

      setChat((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('API Error:', err);
      setChat((prev) => [...prev, { role: 'ai', content: '질문 처리 중 오류가 발생했습니다.' }]);
    } finally {
      setLoading(false);
    }
  };

  const answers = chat
    .filter((msg) => msg.role === 'ai' && msg.content.includes('정답여부:') && msg.content.includes('난이도:'))
    .map((msg) => {
      const lines = msg.content.split(/\n/).map((line) => line.trim());
      const obj = {};
      let questionContent = '';

      lines.forEach((line) => {
        if (line.startsWith('정답여부:')) obj.answercheck = line.replace('정답여부:', '').trim();
        if (line.startsWith('질문:')) {
          questionContent = line.replace('질문:', '').trim();
          obj.question = line.replace('질문:', '').trim();
        }
        if (line.startsWith('답변:')) obj.answer = line.replace('답변:', '').trim();
        if (line.startsWith('난이도:')) obj.level = line.replace('난이도:', '').trim();
        if (line.startsWith('테마:')) obj.subject = line.replace('테마:', '').trim();
      });

      obj.date = new Date(msg.date).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      if (!questionContent) {
        obj.id = Math.random().toString(36).substring(2, 12);
      } else {
        const normalizedContent = normalizeQuestion(questionContent);
        obj.id = stringToHash(normalizedContent);
      }

      return obj;
    });

  useEffect(() => {
    if (answers.length > 0) {
      addQuestions(answers);
    }
  }, [chat, addQuestions]);

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
