import ArticleCard from '../ArticleCard'
import NewsSectionTitle from '../NewsSectionTitle'
export default function LatestNews() {
  return (
    <div className='w-full bg-[#f7f8fa] px-4 lg:py-8 py-4'>
      <NewsSectionTitle title='Latest News' />
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8  mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 order-2 md:order-1'>
          <ArticleCard
            articleId='123'
            preferenceData={['Politics']}
            isAuthenticated={false}
            layoutStyle='landscape'
          />
          <ArticleCard
            articleId='123'
            preferenceData={['Politics']}
            isAuthenticated={false}
            layoutStyle='landscape'
          />
        </div>
        <div className='order-1 md:order-2'>
          <ArticleCard
            articleId='123'
            preferenceData={['Politics']}
            isAuthenticated={false}
            layoutStyle='landscape'
          />
        </div>
      </div>
    </div>
  )
}
