import queryString from 'query-string'

const PayUrl = () => {
  const location = window.location
  const params = queryString.parse(location.search)
  return (
    <div>
      btx
      <iframe
        style={{
          width: '100vw',
          height: '100vh'
        }}
        src={`${params.url}&s=${params.s}`}
        title="This is a unique title"
      />
    </div>
  )
}
export default PayUrl