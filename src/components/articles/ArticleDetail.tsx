import React from 'react';
import { Card } from 'antd';
import { Article } from '../../domain/entities/Article';
import './ArticleDetail.css';

interface ArticleDetailProps {
    article: Article | null;
  }

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  if (!article) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card
      title={article.title}
      cover={<img alt={article.title} src={article.urlToImage} width={400} height={300}/>}
      className='news-app__article-detail-card'
    >
      <p>{article.description}</p>
      <p>{article.content}</p>
      <p>Published At: {formatDate(article.publishedAt)}</p>
      {article.url && (
        <p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </p>
      )}
    </Card>
  );
};

export default ArticleDetail;