import { useEffect } from "react";

export default function Rtc() {
    /**
     * The following 10-step recipe describes a typical usage scenario of the WebRTC APIs:
        1. Create a MediaStream object from your local devices (e.g., microphone, webcam).
        2. Obtain a URL blob from the local MediaStream.
        3. Use the obtained URL blob for a local preview.
        4. Create an RTCPeerConnection object.
        5. Add the local stream to the newly created connection.
        6. Send your own session description to the remote peer.
        7. Receive the remote session description from your peer.
        8. Process the received session description and add the remote stream to your
        RTCPeerConnection.
        9. Obtain a URL blob from the remote stream.
        10. Use the obtained URL blob to play the remote peer’s audio and/or video.
     */
    function successCallback(stream) {
        console.log(stream);
    }
    function errorCallback(error) {
        console.log(error);
    }
    useEffect(() => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia;

        var constraints = { audio: true, video: false };

        // var video = document.querySelector("video");

        navigator.getUserMedia(constraints, successCallback, errorCallback);
    })


    return (
        <div>
            <h1><code>getUserMedia()</code> very simple demo</h1>
            <p>With this example, we simply call <code>getUserMedia()</code> {`and display
                the received stream inside an HTML5 <video> element`}</p>
            <p>View page source to access both HTML and JavaScript code...</p>
            <video autoPlay></video>
        </div>
    )
}
