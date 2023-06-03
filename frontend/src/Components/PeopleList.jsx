import React, { useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { data } from "./peopleList"

export default function PeopleList() {
    const [people, setPeople] = useState(data)
    const [deletedPeople, setDeletedPeople] = useState([])
    const [rewinds, setRewinds] = useState([])

    function deletePerson(id) {
        setPeople(people.filter(person => person.id != id))
        setDeletedPeople([...deletedPeople, data.find(person => person.id == id)])
    }

    function deleteAll() {
        setPeople([])
        setDeletedPeople(data)
    }

    function restoreAll() {
        setPeople(data)
        setDeletedPeople([])
    }

    function restorePerson(id) {
        setPeople([...people, data.find(person => person.id == id)])
        setDeletedPeople(deletedPeople.filter(person => person.id != id))
    }

    function rewindHandler() {
        const rewindStep = rewinds.pop()

        if (!rewindStep) return;

        setPeople(rewindStep.people)
        setDeletedPeople(rewindStep.deletedPeople)
        setRewinds(rewinds)
    }

    return (
        <div className='container py-5'>
            <Button variant='warning mb-5' onClick={rewindHandler}> Rewind </Button>
            <ListGroup>
                {people.map(person =>
                    <ListGroup.Item key={person.id}>
                        <div className="d-flex justify-content-between">
                            <div>
                                {person.name}
                            </div>
                            <div>
                                <Button variant='danger' onClick={() => {
                                    deletePerson(person.id)
                                    setRewinds([...rewinds, {
                                        deletedPeople: deletedPeople,
                                        people: people
                                    }])
                                }}>X</Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <div className='text-center'>
                <Button variant='danger' className='mt-5' onClick={() => {
                    deleteAll()
                    setRewinds([...rewinds, {
                        deletedPeople: deletedPeople,
                        people: people
                    }])
                }}>Delete All</Button>
                <Button variant='primary' className='mt-5' onClick={() => {
                    restoreAll()
                    setRewinds([...rewinds, {
                        deletedPeople: deletedPeople,
                        people: people
                    }])
                }}>Restore All</Button>
            </div>

            <div>
                <ListGroup>
                    {deletedPeople.map(person =>
                        <ListGroup.Item key={person.id}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    {person.name}
                                </div>
                                <div>
                                    <Button variant='primary' onClick={() => {
                                        restorePerson(person.id)
                                        setRewinds([...rewinds, {
                                            deletedPeople: deletedPeople,
                                            people: people
                                        }])
                                    }}>Restore</Button>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </div>
    )
}
