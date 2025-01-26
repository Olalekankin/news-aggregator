import React from 'react'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import ArticleCard2 from '../../components/ArticleCard2'
export default function PopularNewsSection() {
  return (
    <div className='w-full bg-[#F5F5F5] px-4 lg:px-20 lg:py-8 py-4'>
      <NewsSectionTitle title='Popular News' />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  mt-5'>
        <ArticleCard2 articleId='123'/>
        <ArticleCard2 articleId='123'/>
        <ArticleCard2 articleId='123'/>
        <ArticleCard2 articleId='123'/>
      </div>
    </div>
  )
}
