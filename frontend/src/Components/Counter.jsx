import { useState } from 'react'
import { Button } from 'react-bootstrap'

function Counter() {
    const [count, setCount] = useState(0)


    return (
        <>
            <div className="container p-5">
                <div className="row justify-content-center">
                    <div className="col-3">
                        <Button variant="primary" onClick={() => setCount(count + 1)}>+</Button>

                    </div>
                    <div className="col-3">
                        {count}
                    </div>
                    <div className="col-3">
                        <Button variant="danger" onClick={() => setCount(count - 1)}>-</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Counter
