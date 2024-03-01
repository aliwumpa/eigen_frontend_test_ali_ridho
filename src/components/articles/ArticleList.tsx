import React, { useEffect, useState } from 'react';
import ArticleDetail from './ArticleDetail';
import { FetchArticlesUseCase } from '../../domain/useCases/FetchArticlesUseCase';
import { ReactDriver } from '../../framework/drivers/ReactDriver';
import { Article } from '../../domain/entities/Article';
import { Modal, Spin, Row, Col } from 'antd';
import './ArticleList.css';

interface ArticleListProps {
  section: 'top-headlines' | 'everything';
  handleArticleClick: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({section}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchArticlesUseCase = new FetchArticlesUseCase(new ReactDriver());

      let fetchedArticles: Article[] = [];
      if (section === 'top-headlines') {
        fetchedArticles = await fetchArticlesUseCase.fetchTopHeadlines();
      } else if (section === 'everything') {
        fetchedArticles = await fetchArticlesUseCase.fetchEverything();
      }

      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, [section]);

  const handleArticleClick = (article: Article) => {
    setIsLoading(true);
    setSelectedArticle(article);

    setTimeout(() => {
      setIsLoading(false);
      setIsModalVisible(true);
    }, 2000);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>{section === 'top-headlines' ? 'Top Headlines' : 'All'} Article</h2>
      <Row className="news-app__article-list-row" gutter={16} justify="space-around">
        {articles.map((article, index) => (
          <Col className="news-app__article-list-col" key={article.id || index} span={index === 0 ? 24 : 8}>
            <div onClick={() => handleArticleClick(article)}>
              <img src={article.urlToImage} alt={article.title} style={{ width: '100%', height: 'auto' }} />
              <p>{article.title}</p>
            </div>
          </Col>
        ))}
      </Row>

      {isLoading ? (
        <Spin className='news-app__article-list-loader' size="large" />
      ) : (
        <Modal
          title="Article Detail"
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          className='news-app__article-modal'
        >
          <ArticleDetail article={selectedArticle} />
        </Modal>
      )}
      
    </div>
  );
};

export default ArticleList;