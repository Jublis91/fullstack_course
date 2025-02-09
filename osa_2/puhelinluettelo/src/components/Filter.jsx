const Filter = ({ filter, onChange }) => {
    return (
      <div>
        <p>Filter shown with: <input value={filter} onChange={onChange} /></p>
      </div>
    )
  }
  
  export default Filter
  