import React, { useEffect } from "react";

const App = () => {

  //const inputRef = useRef();
  useEffect(() => {
    window.createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "Build/UnityBuild.data",
      frameworkUrl: "Build/UnityBuild.framework.js",
      codeUrl: "Build/UnityBuild.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Tower Of Hanoi",
      productVersion: "0.1",
    }).then((unityInstance) => {
      console.log({ unityInstance });
    }).catch((message) => {
      alert(message);
    });
  }, [])

  const style = {
    width: "100%%",
    height: "600px",
    backgroundColor: "#231F20",
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <canvas id="unity-canvas" style={style}></canvas>
      </div>
    </>
  )
}

export default App;
