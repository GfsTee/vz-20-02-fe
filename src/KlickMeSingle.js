const KlickMeSingle = (props) => {
    console.log(props);
    return (
        <div>
            {props.text} <br />
            <button onClick={() => props.handleClick()}>
                klick me
            </button>
        </div>
    );
}

export default KlickMeSingle;