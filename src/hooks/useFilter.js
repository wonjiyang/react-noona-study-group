export const useSearchFilter = (items, searchTerm) => {
  if (!searchTerm) return items;
  const lowerTerm = searchTerm.toLowerCase();

  return items.filter((item) => {
    const questionText = item.question?.toLowerCase() || '';
    const answerText = item.answer?.toLowerCase() || '';
    return questionText.includes(lowerTerm) || answerText.includes(lowerTerm);
  });
};

// 난이도 필터
export const useLevelFilter = (items, selectedLevel) => {
  return selectedLevel
    ? items.filter((item) => item.level === selectedLevel)
    : items;
};

// 주제 필터
export const useSubjectFilter = (items, selectedSubject) => {
  return selectedSubject
    ? items.filter((item) => item.subject === selectedSubject)
    : items;
};

// 종합 필터
export const useFilteredItems = (
  items,
  searchTerm,
  selectedLevel,
  selectedSubject
) => {
  let filtered = items;
  filtered = useSearchFilter(filtered, searchTerm);
  filtered = useLevelFilter(filtered, selectedLevel);
  filtered = useSubjectFilter(filtered, selectedSubject);
  return filtered;
};
