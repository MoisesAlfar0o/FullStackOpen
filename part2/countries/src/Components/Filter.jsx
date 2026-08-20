const Filter = ({ onChange, filter }) => {
  return (
    <>
      Filter countries <input type="text" onChange={onChange} value={filter}/>
    </>
  )
}

export default Filter