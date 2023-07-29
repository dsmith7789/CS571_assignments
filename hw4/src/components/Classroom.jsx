import { useEffect, useState } from "react";
import { Button, Container, Form, Row} from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {

    const [students, setStudents] = useState([]);
    const [showStudents, setShowStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");

    useEffect(() => {
        function filterStudents() {
            setShowStudents(students.filter(student => {
                let firstName = student.name.first.toLowerCase();
                let lastName = student.name.last.toLowerCase();
                let fullName = firstName.concat(" ", lastName);
    
                if ((fullName.includes(searchName.toLowerCase().trim()) || searchName.toLowerCase().trim().length === 0) && 
                    ((student.major.toLowerCase().includes(searchMajor.toLowerCase().trim()) || searchMajor.toLowerCase().trim().length === 0)) &&
                    ((student.interests.some(interest => interest.toLowerCase().includes(searchInterest.toLowerCase().trim()))) || searchInterest.toLowerCase().trim().length === 0)) {
                        return true;
                    } else {
                        return false;
                    }
            }));
        }
        filterStudents();
    }, [searchName, searchInterest, searchMajor, students])
    

    // on load, do this
    useEffect(() => {
        fetch("https://cs571.org/s23/hw4/api/students", {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        })
        .then(res => res.json())
        .then(studentData => {
            console.log(studentData);
            setStudents(studentData);
            setShowStudents(studentData);
        })
    }, [])

    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control 
                id="searchName"
                value = {searchName}
                onChange = {(e) => setSearchName(e.target.value)}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control 
                id="searchMajor"
                value = {searchMajor}
                onChange = {(e) => setSearchMajor(e.target.value)}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control 
                id="searchInterest"
                value = {searchInterest}
                onChange = {(e) => setSearchInterest(e.target.value)}
            />
            <br />
            <Button 
                variant="neutral"
                onClick = {() => {
                    setSearchName("");
                    setSearchMajor("");
                    setSearchInterest("");
                }}
            >Reset Search</Button>
        </Form>
        <Container fluid>
            <Row xs = {1} sm = {2} md = {3} lg = {4} xl = {6}>
                {
                    showStudents.map(stud => <Student key = {stud.id} {...stud}/>)    
                }
            </Row>
        </Container>
    </div>

}

export default Classroom;