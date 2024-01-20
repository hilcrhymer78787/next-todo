import { useEffect } from 'react'
import { useRouter } from 'next/router';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/tasks');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
}
export default Home
