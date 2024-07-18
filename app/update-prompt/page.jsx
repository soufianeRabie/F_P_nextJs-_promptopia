'use client'
import {useEffect, useState} from 'react'
import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id') ;
    console.log('pr' ,promptId);

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState(
        {
            prompt : "",
            tag : "",
        }
    );

    useEffect(() => {
        const getPromptDetails = async ()=>
        {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost({
                prompt : data.prompt ,
                tag : data.tag 
            });

        }
        if(promptId) getPromptDetails();
    }, [promptId])

    
    const updatePrompt = async (e)=>
    {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found');
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method : 'PATCH',
                body : JSON.stringify({
                    prompt : post.prompt,
                    tag : post.tag ,
                })
            } )
            if(response.ok)
            {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false)
        }
    }
  return (
    <div>
      <Form
        type={"Edit"}
        post={post} 
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        />
    </div>
  )
}

export default EditPrompt
