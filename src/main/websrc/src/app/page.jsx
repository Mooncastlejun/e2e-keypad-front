"use client";

import React, { useEffect } from "react";
import useSecureKeypad from "../hooks/useSecureKeypad";
import SecureKeypad from "../components/SecureKeypad";
import KeypadUserInput from "../components/KeypadUserInput.jsx";

export default function Page() {
  // 훅에서 필요한 states와 actions를 분리합니다.
  const { states, actions } = useSecureKeypad();

  // 컴포넌트가 마운트될 때 getSecureKeypad를 호출합니다.
  useEffect(() => {
  }, [actions]);

  // 키패드 데이터가 없을 경우 로딩 상태를 보여줍니다.
  if (states.keypad === null) {
    actions.getSecureKeypad();
    return <div>...isLoading...</div>;
  }

  // 키패드 데이터를 렌더링합니다.
  return (
    <div>
      {/* userInput은 배열이므로 그대로 사용 가능 */}
      <KeypadUserInput userInput={states.userInput} />
      {/* keypad는 Base64로 인코딩된 문자열이므로 올바르게 렌더링 가능 */}
      <SecureKeypad keypad={states.keypad} onKeyPressed={actions.onKeyPressed} />
    </div>
  );
}
