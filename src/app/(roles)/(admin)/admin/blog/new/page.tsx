import BlogEditorPage from '../[id]/page';

export default function Page() {
  return <BlogEditorPage params={Promise.resolve({ id: 'new' })} />;
}
