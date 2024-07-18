'use client';

import Profile from '@components/Profile'
import {useState , useEffect} from 'react'
import { useParams } from 'next/navigation';

const OthersProfile = () => {
    const [posts, setPosts] = useState([])
    const [creator, setcreator] = useState(null)
     const {id} = useParams()
    useEffect(() => {
        const fetchPsots = async ()=>
        {
          const response = await fetch(`/api/users/${id}/posts`);
          const data = await response.json()
          console.log('suiim' , data);
    
          setPosts(data);
          setcreator(data[0].creator)
        }
        fetchPsots();
      }, [])

      console.log(posts[0]);
  return (
    <div>
  <Profile
        name={creator?.username}
        desc={`Weclome to ${creator?.username} personalized profile page`}
        data={posts}
     /> 
    </div>
  )
}

export default OthersProfile
