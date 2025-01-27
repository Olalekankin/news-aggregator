import NewsSectionTitle from '../NewsSectionTitle'
import ArticleCard2 from '../ArticleCard2'
export default function PopularNewsSection() {
  return (
    <div className='w-full bg-[#efecec] px-4 lg:py-8 py-4'>
      <NewsSectionTitle title='Popular News' />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5  mt-5'>
        <ArticleCard2 articleId='123' />
        <ArticleCard2 articleId='123' />
        <ArticleCard2 articleId='123' />
        <ArticleCard2 articleId='123' />
      </div>
    </div>
  )
}
