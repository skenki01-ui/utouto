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
      "月と雲を眺める静かな夜",

    component: Yorugumo,

    sound: "rain",

    premium: false,
  },

  {
    id: "rain",

    name: "雨の夜",

    icon: "☔",

    description:
      "雨粒とにじむ街灯の夜",

    component: RainNight,

    sound: "rain",

    premium: true,
  },

  {
    id: "snow",

    name: "雪の夜",

    icon: "❄️",

    description:
      "静かに積もる雪を眺める夜",

    component: SnowNight,

    sound: "snow",

    premium: true,
  },

  {
    id: "takibi",

    name: "焚き火",

    icon: "🔥",

    description:
      "小さな火をぼーっと眺める夜",

    component: Takibi,

    sound: "takibi",

    premium: true,
  },

  {
    id: "deep",

    name: "深海",

    icon: "🌊",

    description:
      "深い海の底へ沈んでいく感覚",

    component: DeepSea,

    sound: "deep",

    premium: true,
  },

  {
    id: "train",

    name: "夜列車",

    icon: "🚆",

    description:
      "流れる灯りと眠たい移動",

    component: NightTrain,

    sound: "train",

    premium: true,
  },

  {
    id: "factory",

    name: "工場夜景",

    icon: "🏭",

    description:
      "海辺から眺める静かな工場",

    component: FactoryNight,

    sound: "factory",

    premium: true,
  },
];

export default modeList;