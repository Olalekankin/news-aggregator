import ArticleCard from '../ArticleCard'
import NewsSectionTitle from '../NewsSectionTitle'
export default function TrendingSection() {
  return (
    <div className='w-full bg-white lg:py-8 py-4 px-4'>
      <NewsSectionTitle title='Trending News' />
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8  mt-5'>
        <div className=''>
          <ArticleCard articleId='2'></ArticleCard>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <ArticleCard articleId='2'></ArticleCard>
          <ArticleCard articleId='2'></ArticleCard>
          <ArticleCard articleId='2'></ArticleCard>
          <ArticleCard articleId='2'></ArticleCard>
        </div>
      </div>
    </div>
  )
}
