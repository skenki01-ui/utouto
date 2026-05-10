import Yorugumo from "../modes/Yorugumo.jsx";
import RainNight from "../modes/RainNight.jsx";
import SnowNight from "../modes/SnowNight.jsx";
import Takibi from "../modes/Takibi.jsx";
import DeepSea from "../modes/DeepSea.jsx";
import NightTrain from "../modes/NightTrain.jsx";
import FactoryNight from "../modes/FactoryNight.jsx";

const modeList = [
  {
    id: "yorugumo",

    name: "よるぐも",

    icon: "🌙",

    description:
      "雲の向こうが少し明るい",

    component: Yorugumo,

    sound: "rain",

    premium: false,
  },

  {
    id: "rain",

    name: "雨の夜",

    icon: "☔",

    description:
      "街の音が雨に混ざってる",

    component: RainNight,

    sound: "rain",

    premium: true,
  },

  {
    id: "snow",

    name: "雪の夜",

    icon: "❄️",

    description:
      "音が遠くなった気がする",

    component: SnowNight,

    sound: "snow",

    premium: true,
  },

  {
    id: "takibi",

    name: "焚き火",

    icon: "🔥",

    description:
      "火だけ見ていたくなる",

    component: Takibi,

    sound: "takibi",

    premium: true,
  },

  {
    id: "deep",

    name: "深海",

    icon: "🌊",

    description:
      "少しだけ耳が静かになる",

    component: DeepSea,

    sound: "deep",

    premium: true,
  },

  {
    id: "train",

    name: "夜列車",

    icon: "🚆",

    description:
      "眠ったまま運ばれていく",

    component: NightTrain,

    sound: "train",

    premium: true,
  },

  {
    id: "factory",

    name: "工場夜景",

    icon: "🏭",

    description:
      "遠くで機械の音がしてる",

    component: FactoryNight,

    sound: "factory",

    premium: true,
  },
];

export default modeList;