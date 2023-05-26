export default function Error({ error }) {
  return (
    <div style={{height: 40}}>
      {error ? (
        <p style={{color: 'red'}}>
        Do not add empty todos!
      </p> ) :
      null
      }
    </div>
    
  )
}