import { useEffect } from "react"

export default function index() {
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            "audio": true
        }).then(stream => {
            console.log(stream);
        }).catch(error => {
            console.log(error);
        })
    })
    return (
        <div>index</div>
    )
}
