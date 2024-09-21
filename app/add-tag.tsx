// // using useState (would also need to move state up or use redux / react query)
// 'use client'

// import { useState } from "react"

// export function AddTag() {
//     const [slug, setSlug] = useState('')

//     async function handleCreateTag(event: FormEvent) {
//         event.preventDefault()
        
//         if (!slug) {
//             return
//         }

//         await fetch('http://localhost:3333/tags', {
//             method: 'POST',
//             body: JSON.stringify({
//                 slug
//             })
//         })
//     }

//     return (
//         <form onSubmit={handleCreateTag}>
//             <input type="text" name="slug" placeholder="Slug da tag" value={slug} onChange={e => setSlug(e.target.value)} />
//             <button type="submit">Create tag</button>
//         </form>
//     )
// }

import { revalidateTag } from "next/cache"
import { AddTagButton } from "./add-tag-button"

export function AddTag() {
    async function handleCreateTag(form: FormData) {
        'use server'

        const slug = form.get('slug')

        if (!slug) {
            return
        }

        // Simulate a 3s delay in posting the new tag
        await new Promise(resolve => setTimeout(resolve, 3000))

        await fetch('http://localhost:3333/tags', {
            method: 'POST',
            body: JSON.stringify({
                slug,
            })
        })

        revalidateTag('get-tags')
    }

    return (
        <form action={handleCreateTag}>
            <input type="text" name="slug" placeholder="Tag slug" />
            <AddTagButton />
        </form>
    )
}