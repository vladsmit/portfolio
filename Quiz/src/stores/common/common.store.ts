import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { IQuizData } from "../../utils/models";

export class CommonStore {
  private _quizData: IQuizData = {
    1: {
      title: "Наибольшее количество приёмов на 20+ ярдов (ресы)",
      answers: [
        { id: 8, name: "Джексон Смит-Нжигба 27" },
        { id: 7, name: "Пука Накуа 27" },
        { id: 6, name: "Джеймисон Уильямс 23" },
        { id: 5, name: "Джордж Пикенс 22" },
        { id: 4, name: "Эмека Эгбука 20" },
        { id: 3, name: "Зэй Флауэрс 19" },
        { id: 2, name: "Амон-Ра Ст. Браун 19" },
        { id: 1, name: "Нико Коллинс 18" },
      ],
    },
    2: {
      title: "Лидеры среди квотербэков по попыткам в РЗ",
      answers: [
        { id: 8, name: "Мэттью Стаффорд 104" },
        { id: 7, name: "Дак Прескотт 99" },
        { id: 6, name: "Джаред Гофф 86" },
        { id: 5, name: "Тревор Лоуренс 81" },
        { id: 4, name: "Бо Никс 80" },
        { id: 3, name: "Джакоби Бриссетт 77" },
        { id: 2, name: "Джастин Херберт 77" },
        { id: 1, name: "Патрик Махоумс 76" },
      ],
    },
    3: {
      title: "Наибольшее количество приёмов у раннеров",
      answers: [
        { id: 1, name: "Кристиан Маккафри 102" },
        { id: 2, name: "Бижан Робинсон 79" },
        { id: 3, name: "Джамир Гиббс 77" },
        { id: 4, name: "Кеннет Гэйнвелл 73" },
        { id: 5, name: "Чейз Браун 69" },
        { id: 6, name: "Девон Эйчейн 67" },
        { id: 7, name: "Эштон Дженти 55" },
        { id: 8, name: "Ар Джэй Харви 47" },
      ],
    },
    4: {
      title: "Дрим-тим Ильдара (QB-2RB-2WR-TE-FLEX-SF)",
      answers: [
        { id: 8, name: "Ламар Джексон АФК Норс" },
        { id: 7, name: "Девон Эчейн АФК Ист" },
        { id: 6, name: "Эштон Дженти АФК Вест" },
        { id: 5, name: "Джастин Джефферсон НФК Норс" },
        { id: 4, name: "Джордин Тайсон НФК Саус" },
        { id: 3, name: "Тайлер Уоррен АФК Саус" },
        { id: 2, name: "Кристиан Маккафри НФК Вест" },
        { id: 1, name: "Джексон Дарт НФК Ист" },
      ],
    },
    superfinal: {
      title: "Кто забил больше всего филд-голов?",
      answers: [
        { id: 0, name: "Каими Фэйрбэйрн", isCorrect: true },
        { id: 1, name: "Джейсон Майерс", isCorrect: false },
        { id: 2, name: "Кэмерон Дикер", isCorrect: false },
        { id: 3, name: "Брэндон Обри", isCorrect: false },
      ],
    },
  };

  private _quizDataAlt: IQuizData = {
    1: {
      title: "Больше всего тачдаунов среди тайт-эндов",
      answers: [
        { id: 8, name: "Даллас Годерт 11" },
        { id: 7, name: "Трей Макбрайд 11" },
        { id: 6, name: "Колби Паркинсон 8" },
        { id: 5, name: "Джейк Фергюсон 8" },
        { id: 4, name: "Джордж Киттл 7" },
        { id: 3, name: "Хантер Хенри 7" },
        { id: 2, name: "Брок Бауэрс 7" },
        { id: 1, name: "Гарольд Фэннин 7" },
      ],
    },
    2: {
      title: "Больше всего брошено перехватов",
      answers: [
        { id: 8, name: "Джино Смит 17" },
        { id: 7, name: "Туа Танговаилоа 15" },
        { id: 6, name: "Сэм Дарнольд 14" },
        { id: 5, name: "Джастин Херберт 13" },
        { id: 4, name: "Дж. Дж. Маккарти 12" },
        { id: 3, name: "Тревор Лоуренс 12" },
        { id: 2, name: "Брайс Янг 11" },
        { id: 1, name: "Патрик Махоумс 11" },
      ],
    },
    3: {
      title: "Больше всего дропов среди ресиверов",
      answers: [
        { id: 8, name: "Джеймисон Уильямс 12" },
        { id: 7, name: "Брайан Томас 10" },
        { id: 6, name: "Джерри Джуди 10" },
        { id: 5, name: "Амон-Ра Ст. Браун 10" },
        { id: 4, name: "Эмека Эгбука 9" },
        { id: 3, name: "Тетаироа Макмиллан 8" },
        { id: 2, name: "Куртланд Саттон 8" },
        { id: 1, name: "СиДи Лэмб 8" },
      ],
    },
    4: {
      title: "Процент точных передач (мин 16 игр)",
      answers: [
        { id: 1, name: "Дрэйк Мэй 72.0" },
        { id: 2, name: "Джош Аллен 69.3" },
        { id: 3, name: "Джаред Гофф 68.0" },
        { id: 4, name: "Сэм Дарнольд 67.7" },
        { id: 5, name: "Дак Прескотт 67.3" },
        { id: 6, name: "Джастин Херберт 66.4" },
        { id: 7, name: "Аарон Роджерс 65.7" },
        { id: 8, name: "Мэттью Стаффорд 65.0" },
      ],
    },
    superfinal: {
      title: "У какого тайт-энда самый длинный забег?",
      answers: [
        { id: 0, name: "Колстон Лавлэнд", isCorrect: false },
        { id: 1, name: "Пэт Фрайермут", isCorrect: true },
        { id: 2, name: "АЖ Барнер", isCorrect: false },
        { id: 3, name: "Томми Трембл", isCorrect: false },
      ],
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  get quizData() {
    return this._quizData;
  }

  get quizDataAlt() {
    return this._quizDataAlt;
  }
}

export const CommonStoreInstance = new CommonStore();

export const CommonStoreContext =
  createContext<CommonStore>(CommonStoreInstance);

export const useCommonStore = (): CommonStore => useContext(CommonStoreContext);
