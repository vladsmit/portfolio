export interface IQuizData {
    [key: string]: {title: string, answers: {id: number, name: string, isCorrect?: boolean}[]};
}