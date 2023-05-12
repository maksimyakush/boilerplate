import { type Component, createResource, For } from 'solid-js'
import { type Post } from './types'
import { fetcher } from './utils/fetcher'

const getPosts = async (): Promise<any> => {
  return await fetcher<Post[]>('/api/posts')
}

const [data] = createResource(getPosts)

const App: Component = () => {
  return (
    <>
      {data() != null && data() !== undefined && (
        <ul>
          <For each={data()}>
            {(item) => (
              <>
                <div>{item.title}</div>
                <div>{item.body}</div>
              </>
            )}
          </For>
        </ul>
      )}
    </>
  )
}

export default App
