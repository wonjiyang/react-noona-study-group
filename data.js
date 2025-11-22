const data = [
  {
    id: 1,
    difficulty: '하',
    topic: '기본 문법',
    question: '자바스크립트에서 변수를 선언할 때 사용하는 var, let, const 키워드의 차이점을 간략히 설명해 주세요.',
    expectedAnswer:
      'var는 함수 스코프를 가지며 재선언 및 재할당이 가능합니다. let과 const는 블록 스코프를 가지며, let은 재할당이 가능하고 const는 재할당이 불가능합니다.',
    createdAt: '2025-11-18 01:05:12',
    language: 'JavaScript',
    explanation:
      'var는 함수 스코프를 가지며 호이스팅 시 undefined로 초기화됩니다. let과 const는 블록 스코프를 가지며 호이스팅되지만 TDZ(Temporal Dead Zone)에 의해 선언 전에 접근할 수 없습니다. const는 참조 타입의 경우 내부 속성은 변경 가능하지만, 재할당(새로운 객체 할당)은 불가능합니다.',
  },
  {
    id: 2,
    difficulty: '하',
    topic: '타입',
    question: '원시 타입(Primitive Type)과 참조 타입(Reference Type)의 가장 큰 차이점은 무엇인가요?',
    expectedAnswer:
      '원시 타입은 실제 값이 저장되는 반면, 참조 타입(객체, 배열, 함수)은 값이 저장된 메모리의 주소(참조 값)가 저장됩니다.',
    createdAt: '2025-11-18 03:20:45',
    language: 'JavaScript',
    explanation:
      '원시 타입(String, Number, Boolean, Null, Undefined, Symbol, BigInt)은 스택 메모리에 실제 값이 저장되어 값에 의한 복사(Call by Value)가 이루어집니다. 참조 타입(Object, Array, Function)은 스택에 힙 메모리의 주소(참조)가 저장되며, 복사 시 주소만 공유되어 참조에 의한 복사(Call by Reference)처럼 동작합니다.',
  },
  {
    id: 3,
    difficulty: '하',
    topic: '기본 문법',
    question: 'null과 undefined의 차이점은 무엇인가요?',
    expectedAnswer:
      "undefined는 변수가 선언되었지만 값이 할당되지 않은 상태이며, null은 변수에 값이 없다는 것을 의도적으로 할당한 '값'입니다.",
    createdAt: '2025-11-18 05:48:33',
    language: 'JavaScript',
    explanation:
      'undefined는 JS 엔진이 변수 선언 후 초기화하지 않았거나, 반환 값이 없는 함수 등에서 자동 할당됩니다. null은 개발자가 의도적으로 "값이 없음"을 설정할 때 사용합니다. 참고로 typeof null은 객체가 아니지만 역사적인 버그로 인해 \'object\'를 반환합니다.',
  },
  {
    id: 4,
    difficulty: '하',
    topic: '비교 연산자',
    question: '== 연산자와 === 연산자의 차이점을 설명해 주세요.',
    expectedAnswer:
      '==는 값만 비교하는 느슨한 비교(Loose Equality)이고, ===는 값과 타입 모두 비교하는 엄격한 비교(Strict Equality)입니다.',
    createdAt: '2025-11-18 07:11:01',
    language: 'JavaScript',
    explanation:
      '== 연산자는 비교하기 전에 암시적 타입 변환(Implicit Coercion)을 시도하여 타입을 일치시키려고 합니다. 이는 예상치 못한 결과를 초래할 수 있으므로, 안전하고 예측 가능한 비교를 위해 타입 변환이 없는 === (엄격한 비교)를 사용하는 것이 권장됩니다.',
  },
  {
    id: 5,
    difficulty: '하',
    topic: '함수',
    question: '화살표 함수(Arrow Function)와 일반 함수의 주요한 차이점 한 가지를 말해주세요.',
    expectedAnswer:
      '화살표 함수는 자신만의 this 바인딩을 생성하지 않고, 항상 상위 스코프의 this를 상속받습니다. 일반 함수는 호출 방식에 따라 this가 동적으로 결정됩니다.',
    createdAt: '2025-11-18 09:35:50',
    language: 'JavaScript',
    explanation:
      '화살표 함수는 선언될 때의 상위 스코프(Lexical Scope)의 this를 영구적으로 바인딩합니다. 반면 일반 함수는 호출될 때 this가 결정됩니다. 또한, 화살표 함수는 생성자로 사용할 수 없으며(new 연산자 사용 불가), arguments 객체를 가지지 않습니다.',
  },
  {
    id: 6,
    difficulty: '하',
    topic: '객체/배열',
    question: 'JavaScript에서 객체 또는 배열을 복사할 때 얕은 복사(Shallow Copy)는 무엇인가요?',
    expectedAnswer:
      '얕은 복사는 객체의 첫 번째 단계만 복사하고, 중첩된 객체나 배열은 참조(주소)를 공유하는 복사 방식입니다. 주로 스프레드 연산자(...) 등을 사용합니다.',
    createdAt: '2025-11-18 11:59:17',
    language: 'JavaScript',
    explanation:
      '얕은 복사는 최상위 속성만 새로운 메모리에 복사하고, 중첩된 객체/배열은 원본과 복사본이 동일한 주소를 공유하게 됩니다. 따라서 복사본에서 중첩된 값을 변경하면 원본에도 영향을 미칩니다. 깊은 복사는 중첩된 객체까지 모두 재귀적으로 복사하여 완전한 독립본을 만듭니다.',
  },
  {
    id: 7,
    difficulty: '하',
    topic: '비동기',
    question: '비동기 작업이 무엇이며, 이를 처리하는 가장 기본적인 방법은 무엇인가요?',
    expectedAnswer:
      '비동기 작업은 현재 실행 중인 코드의 완료를 기다리지 않고 다음 코드를 실행하게 하는 작업입니다. 가장 기본적으로는 콜백(Callback) 함수를 사용하여 처리합니다.',
    createdAt: '2025-11-18 14:22:44',
    language: 'JavaScript',
    explanation:
      '비동기 작업은 네트워크 요청, 타이머(setTimeout, setInterval) 등 시간이 걸리는 작업을 메인 스레드(Event Loop)에서 분리하여 블로킹(Blocking)을 방지합니다. 콜백은 작업 완료 후 실행할 함수를 미리 전달하는 방식이며, 현재는 콜백의 단점(콜백 지옥)을 해결한 Promise, 그리고 async/await 구문이 주로 사용됩니다.',
  },
  {
    id: 8,
    difficulty: '하',
    topic: '배열 메서드',
    question:
      '배열에서 요소를 순회하며 각 요소에 대해 함수를 실행하지만 새로운 배열을 반환하지 않는 메서드는 무엇인가요?',
    expectedAnswer:
      '`forEach()` 메서드입니다. 배열을 순회하며 부수 효과(Side Effect)를 일으키는 용도로 사용되며, 반환 값은 항상 undefined입니다.',
    createdAt: '2025-11-18 16:03:29',
    language: 'JavaScript',
    explanation:
      'forEach()는 배열의 각 요소에 대해 콜백 함수를 실행하지만, 명시적으로 반환 값이 정의되어 있지 않으므로 항상 undefined를 반환합니다. 따라서 기존 배열의 요소를 수정하거나, 외부 변수 업데이트, 콘솔 출력 등 부수 효과를 위해 사용됩니다. 배열 변형 후 새 배열을 원한다면 map(), filter()를 사용해야 합니다.',
  },
  {
    id: 9,
    difficulty: '하',
    topic: '문자열',
    question: '템플릿 리터럴(Template Literal)을 사용하는 주된 이유는 무엇인가요?',
    expectedAnswer:
      '백틱(``)을 사용하여 문자열 내부에 변수나 표현식을 ${} 형태로 쉽게 삽입(Interpolation)할 수 있고, 여러 줄의 문자열을 작성하기 용이합니다.',
    createdAt: '2025-11-18 18:31:55',
    language: 'JavaScript',
    explanation:
      '템플릿 리터럴은 ES6에서 도입되었으며, 변수/표현식을 문자열에 넣는 문자열 보간 기능과, 별도의 이스케이프 문자 없이도 줄 바꿈을 포함할 수 있는 편리함을 제공합니다. 또한, 태그 함수를 이용한 Tagged Templates 기능을 통해 문자열을 구문 분석하고 조작하는 고급 사용도 가능합니다.',
  },
  {
    id: 10,
    difficulty: '하',
    topic: '타입 변환',
    question: '명시적 타입 변환(Explicit Coercion)과 암시적 타입 변환(Implicit Coercion)의 차이점을 설명해 주세요.',
    expectedAnswer:
      '명시적 변환은 개발자가 `String()`, `Number()`와 같은 함수를 사용하여 의도적으로 타입을 바꾸는 것이고, 암시적 변환은 자바스크립트 엔진이 연산자 사용 시 자동으로 타입을 바꾸는 것입니다(예: 문자열 + 숫자).',
    createdAt: '2025-11-18 20:49:11',
    language: 'JavaScript',
    explanation:
      '명시적 변환은 Number(), String(), Boolean() 같은 내장 함수나 parseInt(), toString() 같은 메서드를 사용하여 개발자가 의도적으로 타입을 변환합니다. 암시적 변환은 + (문자열 연결), - (뺄셈), == (느슨한 비교) 같은 연산자 사용 시 JS 엔진이 자동으로 타입을 변환하는 것입니다. 명시적 변환이 코드의 예측 가능성을 높여 더 권장됩니다.',
  },
];

export default data;
