const Student = (props) => {
   

    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>{props.major}</p>
        <p>{props.name.first} is taking {props.numCredits} credits and {props.fromWisconsin === true ? 'is' : 'is not'} from Wisconsin.</p>
        <p>They have {props.interests.length} interests, including:{props.interests.map((interest) => <li key={interest.toString()}>{interest}</li>)}</p>
    </div>
}

export default Student;