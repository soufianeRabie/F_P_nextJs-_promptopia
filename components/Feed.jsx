'use client'
import {useState , useEffect} from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({data , handleTagClick , id})=>
{
  return <div className='mt-16 prompt_layout'>
          {data.map((post )=>
         ( <PromptCard 
            key={post?.id}
            post={post}
            id={post.creator._id}
            handleTagClick={handleTagClick(post.tag)}
          />))}
        </div>
}
const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filtredPosts, setFiltredPosts] = useState([])

  useEffect(() => {
    const fetchPsots = async ()=>
    {
      const response = await fetch('/api/prompt');
      const data = await response.json()

      setPosts(data);
      setFiltredPosts(data)
    }
    fetchPsots();
  }, [])

  useEffect(() => {
    setFiltredPosts(posts.filter((p)=>p.creator.username.includes(searchText) || 
      p.prompt.includes(searchText) || 
      p.tag.includes(searchText)
    ));
  }, [searchText])

  const handleSearchChange = (e)=>
  {
    setSearchText(e.target.value)
  }

  const handleTagClick = (tag)=>
  {
      setSearchText(tag);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flext-center'>
        <input
          type ={'text'}
          placeholder='Search for tag or a username'
          value ={searchText}
          onChange={(handleSearchChange)}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={filtredPosts}
        handleTagClick={()=>handleTagClick}
      />
    </section>
  )
}

export default Feed
