const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input onChange={props.handleName} value={props.name} required/>
      </div>
      <div>
        number: <input onChange={props.handleNumber} value={props.number} required/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm