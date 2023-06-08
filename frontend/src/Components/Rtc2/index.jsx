import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function Rtc() {
    let localStream = null
    let localPeerConnection = null
    let remotePeerConnection = null

    const localVideoRef = useRef()
    const remoteVideoRef = useRef()

    const startButtonRef = useRef()
    const callButtonRef = useRef()
    const hangupButtonRef = useRef()

    useEffect(() => {
        startButtonRef.current.disabled = false
        callButtonRef.current.disabled = true
        hangupButtonRef.current.disabled = true
    })

    function log(text) {
        console.log("At time: " + (performance.now() / 1000).toFixed(3) + " --> " + text);
    }

    function start() {
        log("Requesting local stream");
        startButtonRef.current.disabled = true

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        navigator.getUserMedia({ audio: true, video: false }, function (stream) {
            localVideoRef.current.srcObject = stream
            callButtonRef.current.disabled = false
            localStream = stream
        }, function (error) {
            log("navigator.getUserMedia error: ", error);
        })
    }

    function call() {
        callButtonRef.current.disabled = true
        hangupButtonRef.current.disabled = false
        log("Starting call");

        if (navigator.webkitGetUserMedia) {
            console.log(webkitRTCPeerConnection);
            RTCPeerConnection = webkitRTCPeerConnection;
            // Firefox
        } else if (navigator.mozGetUserMedia) {
            RTCPeerConnection = mozRTCPeerConnection;
            RTCSessionDescription = mozRTCSessionDescription;
            RTCIceCandidate = mozRTCIceCandidate;
        }

        log("RTCPeerConnection object: " + RTCPeerConnection);

        let servers = null;

        localPeerConnection = new RTCPeerConnection(servers);
        log("Created local peer connection object localPeerConnection");
        localPeerConnection.onicecandidate = gotLocalIceCandidate;

        remotePeerConnection = new RTCPeerConnection(servers);
        log("Created remote peer connection object remotePeerConnection");
        remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
        remotePeerConnection.onaddstream = gotRemoteStream;
        localPeerConnection.addStream(localStream);
        log("Added localStream to localPeerConnection");
        localPeerConnection.createOffer(gotLocalDescription, onSignalingError);
    }

    function onSignalingError(error) {
        console.log('Failed to create signaling message : ' + error.name);
    }

    function gotLocalDescription(description) {
        localPeerConnection.setLocalDescription(description);
        log("Offer from localPeerConnection: \n" + description.sdp);
        remotePeerConnection.setRemoteDescription(description);
        remotePeerConnection.createAnswer(gotRemoteDescription, onSignalingError);
    }

    function gotRemoteDescription(description) {
        remotePeerConnection.setLocalDescription(description);
        log("Answer from remotePeerConnection: \n" + description.sdp);
        localPeerConnection.setRemoteDescription(description);
    }

    function hangup() {
        log("Ending call");
        localPeerConnection.close();
        remotePeerConnection.close();

        localPeerConnection = null;
        remotePeerConnection = null;

        callButtonRef.current.disabled = false
        hangupButtonRef.current.disabled = true
    }

    function gotRemoteStream(event) {
        remoteVideoRef.current.srcObject = stream
        log("Received remote stream");
    }

    function gotLocalIceCandidate(event) {
        if (event.candidate) {
            remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
            log("Local ICE candidate: \n" + event.candidate.candidate);
        }
    }

    function gotRemoteIceCandidate(event) {
        if (event.candidate) {
            localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
            log("Remote ICE candidate: \n " + event.candidate.candidate);
        }
    }

    return (
        <div>
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>
                            Local video
                        </th>
                        <th>
                            'Remote' video
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <video id="localVideo" autoPlay ref={localVideoRef}></video>
                        </td>
                        <td>
                            <video id="remoteVideo" autoPlay ref={remoteVideoRef}></video>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>
                                <button id="startButton" ref={startButtonRef} onClick={start}>Start</button>
                                <button id="callButton" ref={callButtonRef} onClick={call}>Call</button>
                                <button id="hangupButton" ref={hangupButtonRef} onClick={hangup}>Hang Up</button>
                            </div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
