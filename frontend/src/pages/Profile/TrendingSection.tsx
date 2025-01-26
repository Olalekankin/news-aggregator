import React from 'react'
import ArticleCard from '../../components/ArticleCard'
import NewsSectionTitle from '../../components/NewsSectionTitle'
export default function TrendingSection() {
  return (
    <div className='w-full bg-white px-4 lg:px-20 lg:py-8 py-4'>
      <NewsSectionTitle title='Trending News' />
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8  mt-5'>
        <div className=''>
          <ArticleCard articleId='2'></ArticleCard>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <ArticleCard articleId='123'></ArticleCard>
          <ArticleCard articleId='2'></ArticleCard>
          <ArticleCard articleId='2'></ArticleCard>
          <ArticleCard articleId='2'></ArticleCard>
        </div>
      </div>
    </div>
  )
}
