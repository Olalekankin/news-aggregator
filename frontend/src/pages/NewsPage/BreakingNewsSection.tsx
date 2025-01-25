import React from "react";
import ArticleCard from "../../components/ArticleCard";
export default function BreakingNewsSection() {
 return (
   <div className='w-full bg-[#F5F5F5] px-4 lg:px-20 lg:py-8 py-4'>
     <div>
       <h3 className=''>Breaking</h3>
     </div>
     <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8  mt-5 border border-red-500'>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4 order-2 md:order-1'>
         <ArticleCard articleId='2'></ArticleCard>
         <ArticleCard articleId='2'></ArticleCard>
         <ArticleCard articleId='2'></ArticleCard>
         <ArticleCard articleId='2'></ArticleCard>
       </div>
       <div className='order-1 md:order-2'>
         <ArticleCard articleId='2'></ArticleCard>
       </div>
     </div>
   </div>
 )
}