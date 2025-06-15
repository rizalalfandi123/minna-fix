import { useGetLetterQuestions } from "~/services/queries/letterQuestionQueries";

const useQuestions = () => {
  const { data } = useGetLetterQuestions();
};

export default useQuestions;
