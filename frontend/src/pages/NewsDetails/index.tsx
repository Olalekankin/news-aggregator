import { Helmet } from 'react-helmet'
import Breadcrumb from '../../components/BreadCrumb'
import { Img } from '../../components/Img'
import ArticleCard3 from '../../components/ArticleCard3'

const NewsDetails = () => {
  const breadcrumbLinks = [
    { label: 'Home', href: '/' },
    { label: 'article', href: '`' },
  ]
  return (
    <>
      <Helmet>
        <title>Article details - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>

      <div className='px-4 lg:px-0'>
        <Breadcrumb links={breadcrumbLinks} />
        <div className='lg:my-20'>
          <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 lg:col-s'>
            <div className='lg:col-span-3 py-4 lg:py-6'>
              <div className='lg:bg-gray-200 max-h-[250px]'>
                <h2 className='text-lg lg:text-2xl font-medium mb-4 p-3'>
                  How to Spend the Perfect Day on Croatia’s Most Magical Island
                </h2>
                <div className='w-full lg:w-[calc(100%-6%)] top-16 bg-cover bg-center h-[250px] mx-auto'>
                  <Img src='assets/card.png' className='w-full h-full' />
                </div>
              </div>
              <div className='mt-32 md:mt-20'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                  perspiciatis inventore itaque voluptas praesentium nostrum
                  repellat dolore assumenda, iusto reprehenderit quidem a ab
                  unde est ipsam minus neque voluptatem? Quidem, alias excepturi
                  quos, voluptate corporis ipsum culpa possimus doloribus
                  dolorem iste reiciendis ut, voluptates hic quod atque? Eos,
                  quos excepturi temporibus quam ad possimus, neque illo porro
                  fugiat, recusandae sint laudantium quis culpa! Rem similique
                  illo dignissimos sit, eos quo placeat eum sint adipisci
                  ratione nam deleniti, dicta amet deserunt assumenda nulla a
                  eveniet quasi est. Cumque nisi qui asperiores facilis
                  quisquam? Quis laborum quidem fuga, in quasi eius temporibus.
                </p>
              </div>
            </div>
            <div className='min-h-[550px] bg-amber-100 grid grid-cols-1 gap-5'>
              <ArticleCard3 articleId='123'/>
              <ArticleCard3 articleId='123'/>
              <ArticleCard3 articleId='123'/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsDetails
