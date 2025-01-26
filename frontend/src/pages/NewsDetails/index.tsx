import { Helmet } from 'react-helmet'
import Breadcrumb from '../../components/BreadCrumb'
import { Img } from '../../components/Img'
import ArticleCard3 from '../../components/ArticleCard3'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import { IoCalendarClearOutline, IoFolderOutline } from 'react-icons/io5'
import { BsBriefcase } from 'react-icons/bs'

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
            <div className='lg:col-span-3'>
              <div className='lg:bg-gray-200 max-h-[250px]'>
                <h2 className='text-lg lg:text-2xl font-medium mb-4 p-3'>
                  How to Spend the Perfect Day on Croatia’s Most Magical Island
                </h2>
                <div className='w-full lg:w-[calc(100%-6%)] top-16 bg-cover bg-center h-[250px] mx-auto'>
                  <Img src='assets/card.png' className='w-full h-full' />
                </div>
              </div>
              <div className='mt-32 md:mt-24'>
                <div className='flex items-center justify-between md:justify-center space-x-4 lg:space-x-10 xl:space-x-16'>
                  <div className='flex items-center space-x-2'>
                    <IoCalendarClearOutline />
                    <span className='text-xs md:text-sm'>July 14 , 2022</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <BsBriefcase />
                    <span className='text-xs md:text-sm'>CNN</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <IoFolderOutline />
                    <div className='flex items-center space-x-0.5'>
                      <span className='text-xs md:text-sm'>Category:</span>
                      <span className='text-xs md:text-sm'>Lifestyle</span>
                    </div>
                  </div>
                </div>
                <p className='mt-4'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  fugiat neque, eum quis, incidunt fuga dolores nihil enim minus
                  natus sint repudiandae nulla officia eos odit qui hic
                  cupiditate praesentium, ex quod exercitationem obcaecati!
                  Saepe, eligendi est iusto inventore quaerat harum nulla
                  delectus totam, nesciunt illum qui eum ex aliquid fuga eos
                  nisi veritatis beatae veniam tempore quod dignissimos,
                  laboriosam quo maiores! Magnam corporis ipsam sequi libero a
                  quae, iure esse perferendis. Soluta dolorum quae neque. Amet,
                  soluta quod? Maiores consequuntur eaque soluta perspiciatis?
                  Recusandae rerum obcaecati quaerat, illo quos non totam
                  aliquam saepe porro ex sit, dolorum atque voluptates eius!
                  Eaque temporibus doloribus beatae. Est quidem cupiditate, quo,
                  laudantium labore tempore amet quibusdam necessitatibus
                  eveniet mollitia hic, inventore odio vel tenetur aperiam quasi
                  nesciunt ducimus? Necessitatibus, ipsa corporis officia animi
                  harum, rerum adipisci ad voluptatibus aperiam quos laboriosam
                  aliquam tempore quam dignissimos, ratione a quisquam . Libero
                  ducimus accusantium adipisci at quaerat, autem non assumenda
                  reprehenderit similique corporis quod incidunt neque, esse
                  nostrum deleniti obcaecati quia vitae unde veritatis cumque
                  sit mollitia voluptatem. Optio officia fugit temporibus,
                  maxime quo facere animi quos non corporis. Harum, impedit
                  placeat temporibus iste laudantium dolores mollitia modi
                  neque. Rem amet minima sapiente. Repellendus vero cupiditate,
                  illo at quod vel dicta nemo facere! Quidem nihil dolorem
                  explicabo dicta beatae ipsa quibusdam architecto pariatur
                  reiciendis v voluptates ut sequi quasi, eveniet doloribus.
                  Architecto inventore adipisci, autem voluptatem non harum
                  nostrum distinctio voluptates tempora, atque consectetur
                  nihil. Beatae, suscipit consequatur quos, debitis aliquid
                  nihil veniam tempore rerum esse saepe tenetur quo repudiandae
                  labore accusamus blanditiis nulla officia, non ea aspernatur
                  vero odit voluptates inventore minus deserunt! Perferendis,
                  eos rem, labore, quas nam numquam autem ipsum voluptatibus
                  quam obcaecati quia. Esse voluptas itaque accusamus,
                  repellendus tempora natus deleniti deserunt! Dolor officiis
                  nobis voluptas aut ipsum ipsa cumque aspernatur enim rerum
                  omnis. Fugit reiciendis possimus aperiam harum expedita
                  obcaecati vero modi. Atque optio veritatis sapiente, velit
                  obcaecati nobis culpa nam vero accusantium ratione facilis
                  porro harum provident iusto architecto asperiores ipsa
                  doloremque. Soluta officia ratione sunt ullam voluptatem.
                  Atque, numquam consequatur?
                </p>
              </div>
            </div>
            <div className=' bg-rose-50 py-5 min-h-[550px]'>
              <NewsSectionTitle title='Latest news' />
              <div className='grid mt-2 grid-cols-1 gap-10 px-3'>
                <ArticleCard3 articleId='123' />
                <ArticleCard3 articleId='567' />
                <ArticleCard3 articleId='123' />
                <ArticleCard3 articleId='123' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsDetails
