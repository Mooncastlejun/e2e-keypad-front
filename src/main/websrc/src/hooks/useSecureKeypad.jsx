import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [hashes, setHashes] = useState([]); // 각 이미지의 해시값 목록을 위한 상태 추가
  const [userInput, setUserInput] = useState([]);

  const getSecureKeypad = useCallback(async () => {
    try {
      const response = await axios.get("/api/keypad");
      setKeypad(response.data.image);
      setHashes(response.data.hashes); // 해시값 목록을 상태로 설정
    } catch (error) {
      console.error("Failed to fetch keypad image", error);
    }
  }, []);

  const onKeyPressed = (row, col) => {
    if (userInput.length < 6) {
      const index = row * 4 + col; // 위치를 인덱스로 변환 (3x4 배열에서)
      const hash = hashes[index]; // 해당 위치의 해시값 가져오기
      console.log("Hash Value:", hash); // 해시값 출력
      setUserInput((prev) => [...prev, hash]); // 해시값을 사용자 입력에 추가
    }
  };

  useEffect(() => {
    if (userInput.length === 6) {
      setTimeout(() => {
        getSecureKeypad(); // 키패드 재생성
        setUserInput([]); // 사용자 입력 초기화
      }, 1000); // 재생성 전 1초의 지연 시간 (선택 사항)
    }
  }, [userInput, getSecureKeypad]);

  return {
    states: {
      keypad,
      userInput,
    },
    actions: {
      getSecureKeypad,
      onKeyPressed,
    },
  };
}
