import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


export default function AnimeQuotes() {
    const [quote, setQuote] = useState({})
    const [regenerate, setRegenerate] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            const response = await fetch('https://animechan.vercel.app/api/random')
            const data = await response.json()
            setQuote(data)
            setIsLoading(false)
        }
        fetchData()
        return () => {
            console.log("return func");
        }
    }, [regenerate])



    if (isLoading) {
        return (
            <div className='container py-5 d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    const { anime, character } = quote
    return (
        <div className='container py-5 d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{anime}</Card.Title>
                    <Card.Subtitle>{character}</Card.Subtitle>
                    <Card.Text>
                        {quote.quote}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setRegenerate(!regenerate)}>Regenerate</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
