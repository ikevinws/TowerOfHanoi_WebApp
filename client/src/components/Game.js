import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Game = () => {
    useEffect(() => {
        const canvasElement = document.querySelector('#unity-canvas');
        window
            .createUnityInstance(canvasElement, {
                dataUrl: 'Build/UnityBuild.data',
                frameworkUrl: 'Build/UnityBuild.framework.js',
                codeUrl: 'Build/UnityBuild.wasm',
                streamingAssetsUrl: 'StreamingAssets',
                companyName: 'KevinProductions',
                productName: 'Tower Of Hanoi',
                productVersion: '0.1',
            })
            .then((unityInstance) => {})
            .catch(() => {
                // alert(message);
                window.location.reload();
            });
    }, []);

    return (
        <>
            <Container className="text-center p-0">
                <canvas id="unity-canvas" className="game-canvas " />
            </Container>
        </>
    );
};

export default Game;
