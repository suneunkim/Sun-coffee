import { SyncLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SyncLoader color="#dedede" />
    </div>
  )
}

export default Loading
