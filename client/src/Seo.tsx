import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
}

export default function Seo({ title }: SeoProps) {
  return (
    <Helmet>
      <title>{`${title} | Developer`}</title>
    </Helmet>
  );
}
