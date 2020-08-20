import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

const Game = () => {
    // useEffect(() => {
    //     window.createUnityInstance(document.querySelector("#unity-canvas"), {
    //         dataUrl: "Build/UnityBuild.data",
    //         frameworkUrl: "Build/UnityBuild.framework.js",
    //         codeUrl: "Build/UnityBuild.wasm",
    //         streamingAssetsUrl: "StreamingAssets",
    //         companyName: "DefaultCompany",
    //         productName: "Tower Of Hanoi",
    //         productVersion: "0.1",
    //     }).then((unityInstance) => {
    //         console.log({ unityInstance });
    //     }).catch((message) => {
    //         alert(message);
    //     });
    // }, []);

    return (
        <Container fluid>
            <Row className="text-center">
                {/* <canvas id="unity-canvas" className="game-canvas"></canvas> */}
                <h1>hello</h1>

            </Row>
        </Container>
    );
}

export default Game;