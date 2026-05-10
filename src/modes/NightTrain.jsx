import "./NightTrain.css";

export default function NightTrain() {
  return (
    <div className="window">

      <div className="nightTrain">

        {/* 外の流れる灯り */}

        <div className="trainLight light1" />
        <div className="trainLight light2" />
        <div className="trainLight light3" />
        <div className="trainLight light4" />

        {/* 窓反射 */}

        <div className="windowReflection" />

        {/* 窓フレーム */}

        <div className="trainFrameLeft" />
        <div className="trainFrameRight" />

      </div>

    </div>
  );
}