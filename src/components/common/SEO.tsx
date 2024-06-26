import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
}
const SEO = ({ title, description }: SEOProps) => {
  return (
    <Helmet>
      <title>{title} - Sun Coffee</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  )
}

export default SEO
